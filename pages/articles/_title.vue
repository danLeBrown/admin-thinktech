<template>
  <div>
    <ArticleComponent />
  </div>
</template>

<script>
import ArticleComponent from '~/components/articles/ArticleComponent.vue'
export default {
  name: 'Title',
  components: { ArticleComponent },
  middleware: ['auth'],
}
</script>

<style scoped></style>
