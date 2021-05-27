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
                  :src="$asset('author_images/' + article.author.image)"
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
              :src="$asset('assets/images/' + article.images[0])"
              :alt="'' + article.title"
            />
          </div>
        </div>
        <div class="post-inner pt-4 pb-4">
          <div class="post-article">
            <p>
              {{ article.body }} Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Recusandae, repellendus magnam. Incidunt
              voluptates velit eos itaque in nobis vitae consequuntur, eveniet
              tempora placeat blanditiis impedit non numquam distinctio
              architecto corporis. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatem facilis, accusantium culpa, possimus
              numquam amet veniam sit dolorem tempora modi esse sunt expedita
              officiis voluptatibus labore neque laborum vero saepe.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              fugit aperiam maxime dolore voluptates animi, architecto, quae
              harum officia, dignissimos quod excepturi labore vitae soluta quis
              reprehenderit ut nostrum alias? Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Asperiores iste, molestias excepturi
              natus sed quisquam reprehenderit, nobis dolorum quae et, modi cum
              nisi accusamus odit. Quibusdam magnam ea omnis blanditiis? Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Tempora atque
              eveniet mollitia maxime consectetur cupiditate odio voluptates,
              perferendis dignissimos, autem accusamus amet totam minus. Beatae,
              dolorum expedita. Velit, earum error.
            </p>
            <h3>Life is full of shit</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit ducimus amet architecto esse odio officiis,
              laudantium qui illum dignissimos quam blanditiis non cupiditate?
              Iure sunt distinctio sequi. Repellendus, impedit laborum. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis
              nulla et ea sit aut eius, molestias nemo, exercitationem magni
              recusandae voluptate excepturi, eos fugiat rerum! In nam quo natus
              pariatur? Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Qui natus tenetur, officiis sunt ut vero error nesciunt
              consequuntur magnam eum sequi distinctio, reiciendis cupiditate
              assumenda! Odio minus repellat natus in?
            </p>

            <figure>
              <img :src="$asset('assets/images/' + article.images[1])" alt="" />
              <figcaption>Photo from adobestock</figcaption>
            </figure>

            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
              iusto delectus excepturi recusandae at minima ipsum
              necessitatibus. Assumenda ad sit alias itaque magnam nihil eveniet
              commodi atque aspernatur, natus illum. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Rem soluta adipisci, tenetur
              quisquam, cumque magni ab, facilis sit beatae laborum fugit illum!
              Facilis optio voluptatum, labore ab ratione maiores inventore.
            </p>

            <blockquote>
              <div class="blockquote-content">
                Quis adipiscing ligula donec ullamcorper tellus. Id odio
                vulputate aliquam nullam vitae tincidunt semper etiam quam donec
                quis.Donec Massa Integer
              </div>
            </blockquote>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              architecto possimus doloremque dolores. Esse eos tempora voluptas
              expedita maiores numquam doloribus quidem aperiam, repudiandae
              obcaecati, vel illo distinctio fugiat maxime. Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Aspernatur saepe eos
              distinctio, libero voluptate fugit laborum quas nisi esse maxime
              necessitatibus culpa praesentium est ex magnam, veritatis debitis
              amet in.
            </p>

            <h3>Lorem, ipsum dolor sit amet</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium omnis dolorum commodi consectetur illo? Similique,
              aliquid. Cumque quasi possimus voluptate, nulla quia molestias
              laudantium aut corporis, voluptatibus quae obcaecati alias!
            </p>

            <figure>
              <div class="figure-gallery">
                <img
                  :src="$asset('assets/images/' + article.images[0])"
                  alt=""
                />
                <img
                  :src="$asset('assets/images/' + article.images[1])"
                  alt=""
                />
              </div>
              <figcaption>Photo from adobestock</figcaption>
            </figure>

            <blockquote>
              <div class="blockquote-content">
                Quis adipiscing ligula donec ullamcorper tellus. Id odio
                vulputate aliquam nullam vitae tincidunt semper etiam quam donec
                quis.Donec Massa Integer
              </div>
            </blockquote>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              inventore magni exercitationem veritatis commodi eius fuga
              recusandae! Odio porro recusandae in soluta maxime amet numquam
              debitis magni, similique, quo cumque! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Iusto distinctio perferendis totam
              tempore quo reiciendis fuga esse est aliquid debitis
              necessitatibus nisi, aut laudantium nihil, eligendi soluta minus.
              Fugiat, eum.
            </p>
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
        </div>
        <div class="single-article-author-div">
          <div class="single-article-author-content">
            <div class="pl-4 pr-4">
              <img
                :src="$asset('author_images/' + article.author.image)"
                :alt="'' + article.author.name"
                srcset=""
                class="postcard-author-img"
              />
            </div>
            <div class="single-article-author">
              <h4>Written by</h4>
              <h5 class="post-author">{{ article.author.name }}</h5>
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
    }
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
          this.$root.$emit('setSimilarArticles', res.data.data.similar_articles)
        })
        .catch((err) => {
          this.$root.$emit('alertNotification', err.response.status)
        })
    },
  },
}
</script>
<style scoped>
figure {
  margin: 0;
}
figure {
  text-align: center;
}

figure img {
  max-width: 1024px;
  width: 100%;
  height: auto;
  border-radius: 1rem;
}

.post-article figcaption {
  /* color: var(--featured-postcard); */
  display: block;
  font-size: 11px;
  letter-spacing: 0.5px;
  margin: auto;
  padding: 0.3rem;
  text-align: center;
  width: 100%;
}

.post-article blockquote {
  position: relative;
  width: 100%;
}

.post-article blockquote::before {
  position: absolute;
  width: 100%;
  height: -webkit-fill-available;
  display: block;
  content: '"';
  font-size: 100px;
  top: 0;
  left: 0;
  z-index: 1;
  margin-top: 1rem;
}

.post-article blockquote::after {
  position: absolute;
  display: block;
  content: '"';
  width: 100%;
  height: -webkit-fill-available;
  font-size: 100px;
  top: 100%;
  right: 0%;
  z-index: 1;
  text-align: right;
}

.post-article .blockquote-content {
  font-size: 1.5rem;
  letter-spacing: 0;
  margin: 0 0 1rem;
  padding: 3rem 1rem;
}

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

@media screen and (min-width: 768px) {
  figure {
    display: inline-block;
    margin: auto calc(50% - 50vw - 0.8rem) 3%;
    /* min-width: calc(100% + 18rem); */
    transform: translateX(calc(50vw - 50% + 0.8rem));
    width: calc(65vw + 2px);
  }
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
