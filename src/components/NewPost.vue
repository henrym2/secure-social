<template>
<b-card
    class="new-post-card mb-3 ml-2 mr-2">
    <template v-slot:header>
        <div class="d-flex flex-row">
            <h6 class="mb-0 d-flex mr-auto align-self-center">New Post</h6>
            <b-button href="#" v-b-toggle.post-accordian class="d-flex" size="sm">Show</b-button>
        </div>
    </template>
    <b-collapse id="post-accordian">
        <b-form>
            <b-form-group size="sm" label-size="sm">
                <b-form-input v-model="postData.title" placeholder="Post title"></b-form-input>
            </b-form-group>
            <b-form-group size="sm" label-size="sm">
                <b-form-textarea v-model="postData.body" size="sm" no-resize rows="4">
                </b-form-textarea>
            </b-form-group>
            <div class="d-flex flex-row">
                <b-form-group label-for="public-checkbox" class="d-flex mr-auto" label="Public:">
                    <b-form-checkbox v-model="postData.encrypt" value="false" unchecked-value="true" id="public-checkbox" switch class="pl-5"> 
                    </b-form-checkbox>
                </b-form-group>
                <b-button @click="post" class="mb-3" variant="primary" size="sm">Post</b-button>
            </div>
        </b-form>
    </b-collapse>
</b-card>
</template>

<script>
const chef = require("cyberchef");
const BOX_ID = process.env.VUE_APP_BOX_ID

export default {
    name: "NewPost",
    props: {
        newPost: {
            type: Function,
            default: undefined
        },
    },
    data () {
        return {
            postData: {
                encrypt: false,
                title: "",
                body: "",
                author: this.$store.state.user.email
            },
        }
    },
    methods: {
        post () {
            console.log("POSTING")
            console.log(this.$store.state)
            if(this.postData.encrypt){
                this.postData.body = chef.bake(this.postData.body, [
                    {
                        "op": "AES Encrypt",
                        "args": [
                            { "option": "UTF8", "string": this.$store.state.user.privateKey }, 
                            { "option": "UTF8", "string": process.env.VUE_APP_SECRET.toString() }, 
                        "CBC",
                        "Raw", 
                        "Hex"   
                        ] 
                    }
                ]).value
            }
            this.$jsonbox.read(BOX_ID, "users", {query: `email:${this.$store.state.user.email}`, limit: 1 }).then(res => {
                console.log(res)
                this.$jsonbox.create({ ...this.postData, author: res[0].email, trusted: res[0].trusted.map(t => t.email) }, BOX_ID, "posts").then((res) => {
                console.log(res)
                this.props.newPost()
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => console.log(err))            
        }
    }
}
</script>

<style>
.new-post-card {
    width: 23rem;
    max-width: 25rem;
    max-height: 27.3rem;
}
</style>