import AuthApi from './AuthApi'
import Csrf from './Csrf'
export default {
  async getTrending() {
    await Csrf.getCookie()
    return AuthApi.get('/articles/trending')
  },
  async getArticles() {
    await Csrf.getCookie()
    return AuthApi.get('/articles')
  },
  async getAuthor(id) {
    await Csrf.getCookie()
    return AuthApi.get('/articles/author/' + id)
  },
  async getTag(tag) {
    await Csrf.getCookie()
    return AuthApi.get('/articles/tag/' + tag)
  },
  async getTitle(title) {
    await Csrf.getCookie()
    return AuthApi.get('/articles/' + title)
  },
  async create(data) {
    await Csrf.getCookie()
    return AuthApi.post('/articles', data)
  },
  async delete(id) {
    await Csrf.getCookie()
    return AuthApi.delete('/articles/' + id)
  },
}
