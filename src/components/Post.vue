<template>
<b-card
    class="post mb-3 ml-2 mr-2"
    :title=title>
    <b-card-body class="post-body">
        {{body}}
    </b-card-body>
    <div v-if="owned">
    <b-card-footer></b-card-footer>
        <b-button size="sm" variant="danger" @click="remove()">X</b-button>
    </div>
</b-card>
</template>

<script>
const BOX_ID = process.env.VUE_APP_BOX_ID
export default {
    name: "Post",
    props: {
        owned: {
            type: Boolean,
            default: false,
        },
        callBack: Function,
        id: String,
        title: String,
        body: String
    },
    data () {
        return {
            cypherTitle: "",
            cypherBody: ""
        }
    },
    methods: {
        remove () {
            this.$jsonbox.delete(BOX_ID, this.id).then(() => this.callBack())
        }
    }
}
</script>

<style>
.post-body{
    white-space: pre-line;
}
.post{
    width: 23rem;
    max-width: 25rem;
    max-height: 27.3rem;
}
</style>