<template>
<b-card
    class="new-post-card"
    title={{title}}>
    <b-card-body>
        <p>
            {{body}}
        </p>
    </b-card-body>
</b-card>
</template>

<script>
export default {
    name: "Post",
    props: {
        title: String,
        body: String
    }
}
</script>

<style>

</style>