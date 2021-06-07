<template>
  <div class="">
    <h2>
      <i class="bi bi-pencil-square" aria-hidden="true"></i> Edit an article
    </h2>
    <br />
    <form id="editor-form" @submit.prevent="saveArticle">
      <div class="form-content">
        <div class="input-div">
          <h3>
            <input
              id=""
              v-model="title"
              type="text"
              placeholder="Enter title here"
              disabled
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
          <i class="bi bi-save"></i> SAVE
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
  name: 'Id',
  data() {
    return {
      editor: {},
      title: '',
      article: {},
    }
  },
  async mounted() {
    await this.getArticle(this.$route.params.title)
    this.title = this.article.body.title
    const editor = new EditorJS({
      /** * Id of Element that should contain the Editor
       */ holder: 'editorjs',
      /** * Available Tools list. * Pass Tool's class or
Settings object for each Tool you want to use */
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
              byFile: 'http://localhost:8000/api/articles/image', // Your backend file uploader endpoint
              byUrl: 'https://thinktech.fuoye360.com/api/fetchUrl', // Your endpoint that provides uploading by Url
            },
          },
        },
        // image: SimpleImage,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
          },
        },
      },
      data: this.article.body,
    })
    document.querySelector('#editor-form').addEventListener('submit', () => {
      editor
        .save()
        .then((output) => {
          output.title = this.title
          Article.create(output, this.article.id)
        })
        .catch((err) => {
          console.error(err)
        })
    })
  },
  methods: {
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
          // this.$root.$emit('alertNotification', err.response.status)
        })
    },

    saveArticle(e) {
      // editor
      //   .save()
      //   .then((output) => {
      //     Article.create({ title: this.title, content: output })
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
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
}
.preview-btn {
  /* background: rgba(8, 100, 183, 0.25); */
  color: #0864b7 !important;
}

.submit-btn {
  box-shadow: 0 4px 14px 0 rgba(8, 100, 183, 0.25);
}
</style>
