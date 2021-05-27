import Api from './Api'
import Csrf from './Csrf'

export default {
  async getAuthorByName(authorName) {
    await Csrf.getCookie()
    return Api.get(`/account/${authorName}`)
  },
}
