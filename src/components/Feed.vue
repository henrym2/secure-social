<template>
  <div>
      <NewPost @formSubmit="post"></NewPost>
      <Post v-for="post in posts" :key="post._id" :title="post.title" :body="post.body"></Post>
  </div>
</template>

<script>
import NewPost from './NewPost'
import Post from './Post'
import chef from 'cyberchef'
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
      user: this.$store.state.user
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
          _id: 0, title: "NO POSTS FOUND", body: "NO POSTS FOUND", author: "NONE", encrypt: false
        }]
        } else {
          this.posts = result
        }
      }).catch(() => {
        this.posts = [{
          _id: 0, title: "NO POSTS FOUND", body: "NO POSTS FOUND", author: "NONE", encrypt: false
        }]
      })
  },
  methods: {
    post (post) {
      this.$jsonbox.create(post, BOX_ID, "posts").then((res) => {
        this.posts.append(res)
      })
    },
    getPosts(){
      this.$jsonbox.read(BOX_ID, "posts", {sort: "_createdOn", limit: 10}).then(
        (result) => {
          this.posts = result
          let toDecrypt = []
          let promises = []
          //Get a list of posts that can be decrypted and a list of their respective authors as promises
          this.posts.foreach(p => {
            if(p.trusted.includes(this.user._id)){
              toDecrypt.push(p)
              promises.push(this.$jsonbox.read(BOX_ID, "users", p.author))
            }
          Promise.all(promises, (result) => {
            let aKeys = result.flat().map(a => a.secret)
            let decrypted = toDecrypt.map((d,index) => {
              return chef.bake(d.body, [
                  { "op": "AES Decrypt",
                    "args": [
                      { "option": "UTF8", "string": aKeys[index] },
                      { "option": "UTF8", "string": process.env.VUE_APP_SECRET },
                      "CBC", "Raw", "Hex"
                    ] 
                  }
              ])
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
          })
          })
        })
    }
  }
}
</script>

<style>

</style>