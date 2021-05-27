<template>
  <div id="articles-component">
    <h2><i class="fas fa-newspaper"></i> Articles</h2>
    <br /><br />
    <div v-if="$route.name == 'title'" class="pt-4 pb-4">
      <h4>YOU MIGHT ALSO LIKE...</h4>
    </div>
    <div v-if="loading" class="loader-container articles-div">
      <div class="skeleton-loader postcard mb-4">
        <VSkeletonLoader type="image" />
        <VSkeletonLoader type="paragraph" class="article-meta" />
      </div>
      <div class="skeleton-loader postcard mb-4">
        <VSkeletonLoader type="image" />
        <VSkeletonLoader type="paragraph" class="article-meta" />
      </div>
      <div class="skeleton-loader postcard mb-4">
        <VSkeletonLoader type="image" />
        <VSkeletonLoader type="paragraph" class="article-meta" />
      </div>
      <div class="skeleton-loader postcard mb-4">
        <VSkeletonLoader type="image" />
        <VSkeletonLoader type="paragraph" class="article-meta" />
      </div>
      <div class="skeleton-loader postcard mb-4">
        <VSkeletonLoader type="image" />
        <VSkeletonLoader type="paragraph" class="article-meta" />
      </div>
      <div class="skeleton-loader postcard mb-4">
        <VSkeletonLoader type="image" />
        <VSkeletonLoader type="paragraph" class="article-meta" />
      </div>
    </div>
    <div v-else class="articles-div">
      <div
        v-for="article in articles"
        :key="article.id"
        v-ripple
        class="postcard mb-4"
      >
        <div class="postcard-container">
          <router-link
            class="postcard-img-div"
            :to="{ name: 'title', params: { title: article.meta.title_link } }"
          >
            <img
              class="postcard-img"
              :src="$asset('assets/images/' + article.images[0])"
              :alt="'' + article.title"
            />
          </router-link>
          <div class="postcard-text-div">
            <div class="mb-2">
              <router-link
                class="postcard-header"
                :to="{
                  name: 'title',
                  params: { title: article.meta.title_link },
                }"
              >
                {{ article.title }}
              </router-link>
            </div>
            <div class="postcard-mini mb-2">
              {{ article.body }}
            </div>
            <div class="postcard-time">
              <span>
                {{ article.timeago }}
              </span>
              <span> &dash; </span>
              <span> 2 mins read </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Article from '~/assets/js/api/Article'
export default {
  name: 'ArticlesComponent',
  data() {
    return {
      loading: true,
      articles: [],
      author: {},
    }
  },
  // watch: {
  //   $route() {
  //     this.loading = true
  //   },
  // },
  mounted() {
    this.$root.$on('setSimilarArticles', (data) => {
      this.articles = data
      this.loading = false
    })
    this.$root.$on('authorUpdated', () => {
      this.fetchAuthor()
    })
    if (this.$route.name === 'articles') {
      this.fetchAuthor()
    }
  },
  methods: {
    fetchPosts() {
      return Article.getArticles()
        .then((res) => {
          this.articles = res.data.data
        })
        .catch(() => {})
    },
    async fetchAuthor() {
      await this.getAuthor()
      if (!['', null, undefined, {}].includes(this.author)) {
        Article.getAuthor(this.author.id)
          .then((res) => {
            this.articles = res.data.data
            return (this.loading = false)
          })
          .catch(() => {})
      }
    },
    getAuthor() {
      return (this.author = this.$store.state.user.user)
    },
    fetchTag() {
      return Article.getTag(this.$route.params.tag)
        .then((res) => {
          this.articles = res.data.data
          this.loading = false
        })
        .catch(() => {})
    },
  },
}
</script>

<style scoped>
#articles-component {
  margin-top: 2rem;
}
</style>
