<template>
<b-card
    class="new-post-card">
    <template v-slot:header>
        <div class="d-flex flex-row">
            <h6 class="mb-0 d-flex mr-auto align-self-center">New Post</h6>
            <b-button href="#" v-b-toggle.post-accordian class="d-flex" size="sm">Show</b-button>
        </div>
    </template>
    <b-collapse id="post-accordian">
        <b-form>
            <b-form-group size="sm" label-size="sm">
                <b-form-textarea size="sm" no-resize rows="4">
                </b-form-textarea>
            </b-form-group>
            <div class="d-flex flex-row">
                <b-form-group label-for="public-checkbox" class="d-flex mr-auto" label="Public:">
                    <b-form-checkbox id="public-checkbox" switch class="pl-5"> 
                    </b-form-checkbox>
                </b-form-group>
                <b-button class="mb-3" variant="primary" size="sm">Post</b-button>
            </div>
        </b-form>
    </b-collapse>
</b-card>
</template>

<script>
export default {
    name: "NewPost"
}
</script>

<style>
.new-post-card {
    width: 25vw;
}
</style>