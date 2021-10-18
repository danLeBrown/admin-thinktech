<template>
  <div class="postcard mb-4">
    <div
      v-ripple
      class="postcard-container"
      @click="
        checkBtn($event, {
          name: 'articles-title',
          params: { title: d_article.meta.title_link },
        })
      "
    >
      <div class="postcard-img-div">
        <img
          class="postcard-img"
          :src="imgurl[0]"
          :alt="'' + d_article.title"
        />
        <div class="func-div">
          <button class="edit-btn" @click="edit">
            <span class="bi bi-pencil"></span>
          </button>
          <button class="del-btn" @click="confirmDel">
            <span class="bi bi-trash"></span>
          </button>
        </div>
      </div>
      <div v-ripple class="postcard-text-div">
        <div class="mb-2">
          <h3 class="postcard-header">
            {{ d_article.title }}
          </h3>
        </div>
        <div class="postcard-mini mb-2" v-html="content[0]"></div>
        <div class="postcard-time">
          <span
            ><b
              ><i class="bi bi-clock"></i>
              {{ d_article.relative_at }}
            </b></span
          >
          <!-- <span> &dash; </span>
          <span> 2 mins read </span> -->
        </div>
      </div>
    </div>

    <div v-if="showDelete" class="vs-wrapper">
      <div class="vs-container">
        <h3>Are you sure you want to delete <br />"{{ d_article.title }}"</h3>
        <form @submit.prevent="affirmDelete">
          <button v-ripple class="lhs-btn" @click="showDelete = false">
            Keep Article
          </button>
          <button v-ripple class="rhs-btn">
            <span v-if="loading"
              ><v-progress-circular
                indeterminate
                color="white"
                width="3"
                size="20"
              ></v-progress-circular
            ></span>
            <span v-else> Delete Article</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Article from '~/assets/js/api/Article'

export default {
  name: 'SingleArticleComponent',
  props: ['article'],
  data() {
    return {
      showDelete: false,
      loading: false,
    }
  },
  computed: {
    d_article() {
      return this.article
    },
    imgurl() {
      const url = []
      this.article.body.blocks.forEach((block) => {
        switch (block.type) {
          case 'image':
            return url.push(block.data.file.url)
          default:
            break
        }
      })
      return url
    },
    content() {
      const url = []
      this.article.body.blocks.forEach((block) => {
        switch (block.type) {
          case 'paragraph':
            return url.push(
              block.data.text.length > 180
                ? block.data.text.substring(0, 180) + '...'
                : block.data.text
            )
          default:
            break
        }
      })
      return url
    },
  },
  mounted() {
    $('.postcard-container').mouseover((e) => {
      $(e.target).closest('.func-div').css('visibility', 'visible')
    })
  },
  methods: {
    checkBtn(e, link) {
      if ($(e.target).closest('button').length === 0) {
        return this.$router.push(link)
      }
      return true
    },
    edit() {
      return this.$router.push(
        `/articles/new?edit=true&title=${this.d_article.meta.title_link}`
      )
    },
    confirmDel() {
      this.showDelete = true
    },
    affirmDelete() {
      this.loading = true
      return Article.delete(this.d_article.id).then((res) => {
        this.$root.$emit('articleDeleted', this.d_article.id)
        this.$store.dispatch('success/getAlert', res)
        this.showDelete = false
        this.loading = false
      })
    },
  },
}
</script>

<style scoped>
.postcard-container {
  transition: all ease-in-out 300ms;
}
.func-div {
  /* visibility: hidden; */
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: all ease-in-out 300ms;
}
.func-div button {
  padding: 1rem;
  font: inherit;
  color: #fff;
  border-radius: 0.25rem;
}
.edit-btn {
  background: var(--brand-color);
}

.del-btn {
  background: var(--red);
}

.vs-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-container {
  width: 90%;
  max-width: 420px;
  height: auto;
  border-radius: 1rem;
  background: #fff;
  padding: 1rem;
  color: #000;
  text-align: center;
}
.vs-container h3 {
  margin: 0.5rem 0;
}
.vs-wrapper form {
  padding: 1rem 0.5rem;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
}

.vs-wrapper button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--red);
  min-width: 130px;
}

form .lhs-btn {
  color: var(--red);
}

form .rhs-btn {
  background: var(--red);
  color: #fff;
}
.postcard-container:hover {
  cursor: pointer;
  box-shadow: 0 0 4px 14px 0 rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}
</style>
