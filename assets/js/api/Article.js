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
    return Api.get('/articles/' + title)
  },
  async create(data, id) {
    await Csrf.getCookie()
    if (id) {
      return Api.post('/articles', { ...data, id, edit: true })
    }
    return Api.post('/articles', data)
  },

  async delete(id) {
    await Csrf.getCookie()
    return Api.delete('/articles/' + id)
  },
}
