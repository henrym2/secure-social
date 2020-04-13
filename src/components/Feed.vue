<template>
  <div>
      <NewPost :key="newPostKey" :callBack="refresh"></NewPost>
      <Post v-for="post in posts" :key="post._id" 
        :title="post.title" 
        :body="post.body" 
        :id="post._id" 
        :callBack="refresh"
        :owned="owned(post.author)"
        ></Post>
  </div>
</template>

<script>
import NewPost from './NewPost'
import Post from './Post'
// import chef from "cyberchef"
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
      toDecrypt: [],
      newPostKey:0
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
  },
  mounted () {
    this.checkPosts()
  },
  methods: {
    checkPosts() {
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
    owned(author) {
      return author === this.$store.state.user.email
    },
    refresh () {
      this.newPostKey++;
      this.checkPosts()
    },
    decryptPosts() {
      let decrypted = this.toDecrypt.map((d) => {
        let key = this.$store.state.user.privateKey
        return {
            ...d, 
            body: this.$crypt.decrypt(key, d.body)
          }
      })
      this.posts = this.posts.map(p => {
        let obj = p
        let decrypt = decrypted.find(d => d._id == obj._id)
        if (decrypt != undefined && obj.encrypt) {
          obj.body = decrypt.body.message
          return obj
        } else if (obj.encrypt){
          obj.body = JSON.parse(obj.body).cipher
          return obj
        }
        return p
      })
    },
    getPosts(){
      this.$jsonbox.read(BOX_ID, "posts", {sort: "-_createdOn", limit: 10}).then(
        (result) => {
          this.posts = result
          //Get a list of posts that can be decrypted and a list of their respective authors as promises
          this.posts.forEach(p => {
            if(p.encrypt && (p.author == this.$store.state.user.email || p.trusted.includes(this.$store.state.user.email))){
              this.toDecrypt.push(p)
            }
          })
          this.decryptPosts()
      })
    }
  }
}
</script>

<style>

</style>