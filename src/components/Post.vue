<template>
<b-card
    class="post mb-3 ml-2 mr-2"
    :title=title>
    <b-card-body class="post-body">
        {{body}}
    </b-card-body>
</b-card>
</template>

<script>
export default {
    name: "Post",
    props: {
        title: String,
        body: String
    },
    data () {
        return {
            cypherTitle: "",
            cypherBody: ""
        }
    },
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