package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"

	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/peteretelej/jsonbox"
)

var jclient *jsonbox.Client

//User is the model for users
type User struct {
	ID       string      `json:"_id"`
	Email    string      `json:"email"`
	Password string      `json:"password"`
	Key      cipher.AEAD `json:"key"`
	Trusted  []string    `json:"trusted"`
}

type UserParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Post struct {
	Title   string   `json:"title"`
	Body    []byte   `json:"body"`
	Public  bool     `json:"public"`
	Author  string   `json:"author"`
	Trusted []string `json:"string"`
}

func main() {
	jclient, _ = jsonbox.NewClient("https://jsonbox.io/box_248df4a8fb76b6d8fb7f")
	app := fiber.New()
	app.Use(cors.New())
	app.Post("/login", login)
	app.Post("/register", register)
	app.Get("/posts", getPosts)
	app.Post("/posts", newPost)
	app.Listen(3000)
}

func login(c *fiber.Ctx) {
	var params UserParams
	c.BodyParser(&params)

	u, err := jclient.Read(fmt.Sprintf("users?q=email:%s,password:%s", params.Email, params.Password))
	var user []User
	json.Unmarshal(u, &user)
	if err == nil && user != nil {
		log.Println(user)
		c.JSON(user)
	} else {
		log.Println(err, user)
		c.Send("ok")
	}
}

func register(c *fiber.Ctx) {
	var params UserParams
	if err := c.BodyParser(&params); err != nil {
		log.Println(err)
	}
	blk := make([]byte, 32)
	rand.Read(blk)
	cypher, _ := aes.NewCipher(blk)
	gcm, _ := cipher.NewGCM(cypher)
	userData := fmt.Sprintf(
		`{"email":"%s","password":"%s","Key":"%+v","trusted":[]}`,
		params.Email, params.Password, gcm)

	u := []byte(userData)
	jUser, _ := jclient.Create("users", u)

	var newUser User
	json.Unmarshal(jUser, &newUser)
	c.JSON(newUser)
}

func getPosts(c *fiber.Ctx) {
	var posts []Post
	postB, err := jclient.Read("/posts")
	if err != nil {
		log.Println(err)
	}
	json.Unmarshal(postB, &posts)
	c.JSON(posts)
}

func newPost(c *fiber.Ctx) {
	var post Post
	c.BodyParser(&post)
	if post.Public == false {
		var user User
		usrData, _ := jclient.Read(fmt.Sprintf("/users?q=email:%s", post.Author))
		json.Unmarshal(usrData, &user)
		nonce := make([]byte, user.Key.NonceSize())
		post.Body = user.Key.Seal(nonce, nonce, post.Body, nil)
	}
	postData, _ := json.Marshal(post)
	jclient.Create("/posts", postData)

}
