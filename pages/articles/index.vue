<template>
  <div>
    <h2><i class="bi bi-newspaper"></i> Articles</h2>
    <ArticlesComponent />
    <div class="new-article brandColor">
      <nuxt-link to="/articles/new"
        ><i class="bi bi-pencil-square" aria-hidden="true"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import ArticlesComponent from '~/components/articles/ArticlesComponent'
export default {
  name: 'Index',
  components: {
    ArticlesComponent,
  },
  middleware: ['auth'],
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

<style scoped>
.new-article {
  position: fixed;
  bottom: 35px;
  right: 35px;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 14px 0 rgba(8, 100, 183, 0.25);
  z-index: 10;
}
.new-article a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  width: inherit;
  height: inherit;
  text-decoration: none;
}
</style>
