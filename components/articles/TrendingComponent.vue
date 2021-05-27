<template>
  <div id="trending-component">
    <div v-if="loading" class="loader-container">
      <VSkeletonLoader type="image" />
      <VSkeletonLoader
        class="loader-meta"
        type="paragraph, avatar, paragraph, paragraph"
      />
    </div>
    <div v-else class="bg-stories">
      <div class="swiper-container">
        <vue-slick-carousel
          v-if="articles.length > 0"
          class="swiper-wrapper"
          :arrows="false"
          :dots="true"
          :autoplay="true"
          :infinite="true"
        >
          <div
            v-for="article in articles"
            :key="article.id"
            v-ripple
            class="swiper-slide featured-postcard featured"
          >
            <div class="postcard-container">
              <div class="postcard-img-div">
                <nuxt-link
                  :to="{
                    name: 'title',
                    params: { title: article.meta.title_link },
                  }"
                >
                  <img
                    class="postcard-img featured-postcard-img"
                    :src="$asset('assets/images/' + article.images[0])"
                    :alt="'' + article.title"
                  />
                </nuxt-link>
              </div>
              <div class="postcard-text-div">
                <div class="mb-4">
                  <nuxt-link
                    :to="{
                      name: 'tag-tag',
                      params: { tag: article.tag },
                    }"
                  >
                    <h4 class="postcard-tag">{{ article.tag }}</h4>
                  </nuxt-link>
                </div>
                <div class="mb-3">
                  <nuxt-link
                    class="post-title"
                    :to="{
                      name: 'title',
                      params: { title: article.meta.title_link },
                    }"
                  >
                    {{ article.title }}
                  </nuxt-link>
                </div>
                <div>
                  <div
                    class="postcard-author-div"
                    @click="
                      setAuthor(
                        article.author,
                        `/author/${article.meta.author_link}`
                      )
                    "
                  >
                    <img
                      :src="$asset('author_images/' + article.author.image)"
                      :alt="article.author.name"
                      class="postcard-author-img"
                    />
                    <h5 class="post-author">{{ article.author.name }}</h5>
                  </div>
                </div>
                <div class="postcard-mini">
                  {{ article.body }}
                </div>
              </div>
            </div>
          </div>
        </vue-slick-carousel>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-white"></div>
        <!-- Add Arrows -->
        <div class="swiper-div">
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import Article from '~/assets/js/api/Article'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: 'TrendingComponent',
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      articles: [],
      loading: true,
      slidesToShow: 3,
    }
  },
  computed: {
    dark() {
      return this.$store.state.theme.dark
    },
  },
  mounted() {
    this.fetchTrending().then(() => {
      this.loading = false
    })
  },
  methods: {
    fetchTrending() {
      return Article.getTrending().then((res) => {
        this.articles = res.data.data
      })
    },
    async setAuthor(author, link) {
      await this.$store.commit('author/setAuthor', author)
      this.$router.push(link)
    },
  },
}
</script>
<style scoped>
.bg-stories {
  max-width: 100vw;
  min-height: 280px;
}
.loader-container {
  height: 100%;
  border-radius: 1rem;
}
.bg-stories .featured-postcard {
  /* background: var(--v-featured); */
  border-radius: 1rem;
  -webkit-border-radius: 1rem 1rem;
  -moz-border-radius: 1rem 1rem;
  -ms-border-radius: 1rem 1rem;
  -o-border-radius: 1rem 1rem;
}
.featured-postcard-img {
  height: 100%;
  border-radius: 1rem 1rem 0 0;
  -webkit-border-radius: 1rem 1rem 0 0;
  -moz-border-radius: 1rem 1rem 0 0;
  -ms-border-radius: 1rem 1rem 0 0;
  -o-border-radius: 1rem 1rem 0 0;
}
.featured-postcard .post-title::first-letter {
  text-transform: uppercase;
}
@media screen and (min-width: 1024px) {
  .featured-postcard .postcard-container {
    display: grid;
    grid-template-columns: 65% 35%;
  }

  .loader-container {
    display: grid;
    grid-template-columns: 65% 35%;
    width: 100%;
    height: 450px;
  }

  .postcard-container .featured-postcard-img {
    border-radius: 1rem 0 0 1rem;
    -webkit-border-radius: 1rem 0 0 1rem;
    -moz-border-radius: 1rem 0 0 1rem;
    -ms-border-radius: 1rem 0 0 1rem;
    -o-border-radius: 1rem 0 0 1rem;
  }
  .loader-meta {
    border: 2px solid rgba(255, 255, 255, 1);
    border-radius: 1rem;
  }
  #trending-component .loader-meta {
    border-radius: 0 1rem 1rem 0;
    /* border: 1px solid var(--v-featured); */
  }
}
</style>
