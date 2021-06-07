<template>
  <div id="article-component">
    <div v-if="loading">
      <div class="loader-container">
        <VSkeletonLoader
          class="loader-meta"
          type="heading, avatar, paragraph"
        />
        <VSkeletonLoader type="image" />
      </div>
      <VSkeletonLoader type="paragraph" />
    </div>
    <div v-else id="post" style="color: var(--v-text)">
      <div class="postcard-container single-article">
        <div class="post-header">
          <div class="post-meta">
            <div class="postcard-text-div">
              <div class="mb-4">
                <nuxt-link
                  :to="{
                    name: 'tag-tag',
                    params: { tag: article.tag },
                  }"
                  class=""
                  style="text-decoration: none"
                >
                  <h4 class="postcard-tag">{{ article.tag }}</h4>
                </nuxt-link>
              </div>
              <div class="mb-1">
                <h1 class="post-title">{{ article.title }}</h1>
              </div>
              <div class="mb-0 postcard-time">
                <span>
                  {{ article.timeago }}
                </span>
                <span> &dash; </span>
                <span> 2 mins read </span>
              </div>
              <div
                class="postcard-author-div p-0"
                @click="
                  setAuthor(
                    article.author,
                    `/author/${article.meta.author_link}`
                  )
                "
              >
                <img
                  :src="article.author.image"
                  :alt="article.author.name"
                  class="postcard-author-img"
                />
                <h5 class="post-author">{{ article.author.name }}</h5>
              </div>
            </div>
          </div>
          <div class="postcard-img-div">
            <img
              class="postcard-img"
              :src="imgurl[0]"
              :alt="'' + article.title"
            />
          </div>
        </div>
        <div class="post-inner pt-4 pb-4">
          <div id="content" class="post-article" v-html="content"></div>
          <div class="post-share pt-4 pb-4">
            <p class="font-weight-bold">Share this article:</p>
            <div class="ml-2">
              <a
                :href="'http://beem.test' + $route.path"
                target="_blank"
                class="p-1 m-1"
                ><i class="bi bi-facebook"></i
              ></a>
              <a
                :href="'http://beem.test' + $route.path"
                target="_blank"
                class="p-1 m-1"
                ><i class="bi bi-whatsapp"></i
              ></a>
              <a
                :href="'http://beem.test' + $route.path"
                target="_blank"
                class="p-1 m-1"
                ><i class="bi bi-twitter"></i
              ></a>
              <a
                :href="'http://beem.test' + $route.path"
                target="_blank"
                class="p-1 m-1"
                ><i class="bi bi-linkedin"></i
              ></a>
              <a
                :href="'http://beem.test' + $route.path"
                target="_blank"
                class="p-1 m-1"
                ><i class="bi bi-link"></i
              ></a>
            </div>
          </div>
        </div>
        <div class="single-article-author-div">
          <div class="single-article-author-content">
            <div class="pl-4 pr-4">
              <img
                :src="article.author.image"
                :alt="'' + article.author.name"
                class="postcard-author-img"
              />
            </div>
            <div class="single-article-author">
              <h6>Written by</h6>
              <h4 class="post-author">{{ article.author.name }}</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequuntur, temporibus quaerat? Nisi, culpa error itaque odio
                earum facilis quidem ullam fuga molestias nostrum, voluptate
                quis. Autem architecto soluta incidunt modi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="loadmore-div text-center m-n1">
        <button class="text-uppercase p-3 bg-transparent" @click="loadMore()">
          Load Comments <i class="bi bi-caret-down-fill" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Article from '~/assets/js/api/Article'
export default {
  name: 'ArticleComponent',
  data() {
    return {
      article: {},
      loading: true,
      similarArticles: [],
      imgurl: [],
      content: '',
    }
  },
  computed: {
    // imgurl() {
    //   const url = []
    //   this.article.body.blocks.forEach((block) => {
    //     switch (block.type) {
    //       case 'image':
    //         return url.push(block.data.file.url)
    //       default:
    //         break
    //     }
    //   })
    //   return url
    // },
  },
  mounted() {
    this.getArticle(this.$route.params.title).then(() => {
      this.loading = false
    })
  },
  methods: {
    async setAuthor(author, link) {
      await this.$store.commit('author/setAuthor', author)
      this.$router.push(link)
    },
    getArticle(title) {
      return Article.getTitle(title)
        .then((res) => {
          this.article = res.data.data.article
          this.setupPage()
          this.$root.$emit('setSimilarArticles', res.data.data.similar_articles)
          return true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setupPage() {
      const json = this.article.body
      let html = ''
      const imgurl = []
      json.blocks.forEach(function (block) {
        switch (block.type) {
          case 'header':
            html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`
            break
          case 'paragraph':
            html += `<p>${block.data.text}</p>`
            break
          case 'delimiter':
            html += '<hr />'
            break
          case 'image':
            imgurl.push(block.data.file.url)
            html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`
            // this.imgurl.push(block.data.file.url)
            break
          case 'list':
            html += '<ul>'
            block.data.items.forEach(function (li) {
              html += `<li>${li}</li>`
            })
            html += '</ul>'
            break
          default:
            break
        }
      })
      this.content = html
      this.imgurl = imgurl
      return console.log('html: ', html)
    },
  },
}
</script>
<style scoped>
.post-article .figure-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
}
.single-article .postcard-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
  -ms-border-radius: 1rem;
  -o-border-radius: 1rem;
}
.post-share {
  display: flex;
}
.single-article-author-div {
  margin: 0 auto;
}
.single-article-author-content {
  text-align: center;
}
.single-article-author-content img {
  width: 60px !important;
  height: 60px !important;
}
.single-article-author span {
  font-size: 11px;
}
.single-article .postcard-tag {
  padding: 0.5rem;
  width: fit-content;
  border: 1px solid;
}
.post-inner {
  margin: 0 auto;
  max-width: 920px;
  line-height: 1.6rem;
  padding: 0 0.25rem;
}
.post-article {
  /* border-bottom: 1px solid var(--light-grey); */
}
.post-article p {
  margin-bottom: 1rem;
}
.post-article h3 {
  font-size: 24px;
  margin: 2rem 0 1rem;
}
.single-article-author-content {
  display: flex;
  align-items: center;
  text-align: left;
}

@media screen and (min-width: 1024px) {
  .post-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }
  .post-header .postcard-img-div {
    grid-column: 1/2;
  }
  .post-header .post-meta {
    grid-row: 1;
    grid-column: 2/4;
  }
  .loader-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    height: 100%;
  }
  .loader-meta {
    grid-row: 1;
    grid-column: 2/4;
  }
}
.loader-meta {
  padding: 2rem;
}
</style>
