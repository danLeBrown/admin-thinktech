<template>
  <div>
    <ArticlesComponent />
  </div>
</template>

<script>
import ArticlesComponent from '~/components/articles/ArticlesComponent'
export default {
  name: 'Index',
  components: {
    ArticlesComponent,
  },
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
}
</script>

<style scoped></style>
