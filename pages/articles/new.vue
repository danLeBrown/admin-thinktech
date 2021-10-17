<template>
  <div class="">
    <h2>
      <i class="bi bi-pencil-square" aria-hidden="true"></i> Create a new
      article
    </h2>
    <br />
    <form id="editor-form" @submit.prevent="saveArticle">
      <div class="form-content">
        <div class="input-div">
          <h3>
            <input
              id=""
              v-model="new_article.title"
              type="text"
              name=""
              placeholder="Enter title here"
              required
              :disabled="$route.query.edit === 'true'"
            />
          </h3>
          <div class="select-div">
            <i class="bi bi-card-list"></i>
            <select id="" name="">
              <option>Choose Category</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
              <option value="">Arts</option>
            </select>
          </div>
        </div>
        <div class="text-area">
          <div id="editorjs"></div>
        </div>
      </div>
      <div class="input-div btn-div">
        <button type="button" class="preview-btn">CANCEL</button>
        <button type="submit" class="brandColor submit-btn">
          <span v-if="loading"
            ><v-progress-circular
              indeterminate
              color="white"
              width="3"
              size="20"
            ></v-progress-circular
          ></span>
          <span v-else
            ><i class="bi bi-save"></i>
            PUBLISH
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Embed from '@editorjs/embed'
import Checklist from '@editorjs/checklist'
import ImageTool from '@editorjs/image'
import LinkTool from '@editorjs/link'
import Article from '~/assets/js/api/Article'
export default {
  name: 'New',
  middleware: ['auth'],
  data() {
    return {
      editor: {},
      title: '',
      loading: false,
      article: {},
      new_article: {
        title: '',
        body: '',
      },
    }
  },
  async mounted() {
    let body = null
    if (this.$route.query.edit) {
      await this.getArticle(this.$route.query.title)
      this.title = this.article.body.title
      this.title = this.article.title
      body = this.article.body
    }
    const editor = this.setupEditorJS(body)
    document.querySelector('#editor-form').addEventListener('submit', () => {
      editor
        .save()
        .then((output) => {
          // console.log(output)
          this.new_article.body = output
          this.loading = true
          this.saveArticle()
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
    })
  },
  methods: {
    setupEditorJS(body) {
      return new EditorJS({
        /** * Id of Element that should contain the Editor */
        holder: 'editorjs',
        /** * Available Tools list. * Pass Tool's class or Settings object for each Tool you want to use */
        tools: {
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: "Quote's author",
            },
          },
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
            inlineToolbar: ['link'],
          },

          list: { class: List, inlineToolbar: true },
          embed: {
            class: Embed,
            config: { services: { youtube: true, coub: true } },
            inlineToolbar: true,
          },
          checklist: { class: Checklist, inlineToolbar: true },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile:
                  'https://api-thinktech.herokuapp.com/api/v1/articles/upload-image', // Your backend file uploader endpoint
                byUrl: 'https://api-thinktech.herokuapp.com/api/v1/fetchUrl', // Your endpoint that provides uploading by Url
              },
            },
          },
          // image: SimpleImage,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'https://api-thinktech.herokuapp.com/api/v1/fetchUrl', // Your backend endpoint for url data fetching
            },
          },
        },
        data: body,
        onPaste(event) {
          switch (event.type) {
            case 'tag':
              this.handleHTMLPaste(event.detail.data)
              break
            case 'pattern':
              this.handlePatternPaste(event.detail.key, event.detail.data)
              break

            case 'file':
              this.handleFilePaste(event.detail.file)
              break
          }
        },
      })
    },
    saveArticle() {
      // return console.log(new FormData(output))
      if (this.$route.query.edit === true) {
        this.new_article.id = this.article.id
        this.new_article.edit = true
      }
      return Article.create(this.new_article)
        .then((res) => {
          this.loading = false
          this.$store.dispatch('success/getAlert', res)
          this.$router.push({ name: 'articles' })
        })
        .catch((err) => {
          this.$store.dispatch('alert/getAlert', err.response)
        })
    },
    getArticle(title) {
      return Article.getTitle(title)
        .then((res) => {
          this.article = res.data.data.article
          this.$root.$emit('setSimilarArticles', res.data.data.similar_articles)
        })
        .catch((err) => {
          this.$store.dispatch('alert/getAlert', err.response)
        })
    },
  },
}
</script>

<style scoped>
form {
  width: 100%;
}
form .input-div {
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
form h3 {
  flex: 9;
  margin-right: 1rem;
}
form select {
  padding: 0.5rem 1rem;
}
form input {
  display: inline-block;
  width: 100%;
  font: inherit;
  padding: 1rem;
}
form .text-area {
  border-radius: 1rem;
  background: #f7f7f7;
  min-height: 50vh;
}
.form-content {
  display: inline-block;
  width: inherit;
  height: inherit;
}
.btn-div {
  display: flex;
  width: 100%;
  justify-content: flex-end !important;
  padding: 1rem;
}
.btn-div button {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  margin: 0 0.5rem;
  color: #fff;
  border: 2px solid var(--brand-color);
  min-width: 130px;
}
.preview-btn {
  /* background: rgba(8, 100, 183, 0.25); */
  color: #0864b7 !important;
}

.submit-btn {
  box-shadow: 0 4px 14px 0 rgba(8, 100, 183, 0.25);
}
</style>
