<template>
  <div class="feed d-flex flex-column mt-3">
    <Feed></Feed>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed'

export default {
  name: 'UserFeed',
  components: {
    Feed
  }
}
</script>
<style scoped>
.feed {
  align-items: center;
  justify-content: center;
}
</style>
