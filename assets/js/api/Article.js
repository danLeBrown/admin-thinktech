import Api from './Api'
import Csrf from './Csrf'

export default {
  async getTrending() {
    await Csrf.getCookie()
    return Api.get('/articles/trending')
  },
  async getArticles() {
    await Csrf.getCookie()
    return Api.get('/articles')
  },
  async getAuthor(id) {
    await Csrf.getCookie()
    return Api.get('/articles/author/' + id)
  },
  async getTag(tag) {
    await Csrf.getCookie()
    return Api.get('/articles/tag/' + tag)
  },
  async getTitle(title) {
    await Csrf.getCookie()
    return Api.get('/article/' + title)
  },
}
