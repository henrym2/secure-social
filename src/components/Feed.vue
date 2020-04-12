<template>
  <div>
      <NewPost @formSubmit="post"></NewPost>
      <Post v-for="post in posts" :key="post._id" :title="post.title" :body="post.body" :newPost="getPosts"></Post>
  </div>
</template>

<script>
import NewPost from './NewPost'
import Post from './Post'
import chef from "cyberchef"
// const { user, post } = require("../js/constructors")
const BOX_ID = process.env.VUE_APP_BOX_ID

export default {
  name: "Feed",
  components: {
    NewPost,
    Post
  },
   data () {
    return {
      posts: [],
      user: this.$store.state.user,
      toDecrypt: []
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
  },
  mounted () {
    this.$jsonbox.read(BOX_ID, "posts").then((result) => {
        if (result.length <= 0) {
          this.posts = [{
          _id: 0, title: "NO POSTS FOUND", body: "NO POSTS FOUND", author: "NONE", encrypt: false, trusted: []
        }]
        } else {
          this.getPosts()
        }
      }).catch(() => {
        this.posts = [{
          _id: 0, title: "NO POSTS FOUND", body: "NO POSTS FOUND", author: "NONE", encrypt: false, trusted: []
        }]
      })
  },
  methods: {
    post (post) {
      this.$jsonbox.create(post, BOX_ID, "posts").then((res) => {
        this.posts.append(res)
      })
    },
    async decryptPosts(results) {
      console.log(results)
      let aKeys = results.flat().map(a => a.privateKey)
      let decrypted = this.toDecrypt.map((d,index) => {
        let key = ""
        if (d.author == this.$store.state.user.email) {
          key = this.$store.state.user.privateKey
        } else key = aKeys[index]
        return {
            ...d, 
            body: chef.bake(d.body, [
            { "op": "AES Decrypt",
              "args": [
                { "option": "UTF8", "string": `${key}` },
                { "option": "UTF8", "string": process.env.VUE_APP_SECRET },
                "CBC", "Hex", "Raw",
                { "option": "Hex", "string": "" }
              ] 
            }
              ]).value
          }
      })
      this.posts = this.posts.map(p => {
        let obj = p
        let decrypt = decrypted.find(d => d._id == obj._id)
        if (decrypt != undefined) {
          obj.body = decrypt.body
          return obj
        }
        return obj
      })
    },
    getPosts(){
      this.$jsonbox.read(BOX_ID, "posts", {sort: "-_createdOn", limit: 10}).then(
        (result) => {
          this.posts = result
          let promises = []
          //Get a list of posts that can be decrypted and a list of their respective authors as promises
          this.posts.forEach(p => {
            if(p.author == this.$store.state.user.email || p.trusted.includes(this.$store.state.user.email) ){
              this.toDecrypt.push(p)
              promises.push(this.$jsonbox.read(BOX_ID, "users", {query: `email:${p.author}`}))
            }
          })
          console.log(this.toDecrypt)
          Promise.all(promises)
            .then(async (results) => await this.decryptPosts(results))  
            .catch(err => console.log(err))
      })
    }
  }
}
</script>

<style>

</style>