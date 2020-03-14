<template>
<b-card
    class="post mb-3"
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
          
        }
    },
}
</script>

<style>
.post-body{
    white-space: pre-line;
}
.post{
    width: 25vw
}
</style>