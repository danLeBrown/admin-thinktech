import { get } from 'core-js/core/dict'
import Api from './Api'
import Csrf from './Csrf'
export default {
  async update(formData) {
    await Csrf.getCookie()
    return Api.post('/account/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  async register(formData) {
    await Csrf.getCookie()
    return Api.post('/register', formData)
  },

  async stats() {
    await Csrf.getCookie()
    return Api.get('/author/analytics-stats')
  },

  async get() {
    await Csrf.getCookie()
    return Api.get('/user')
  },
}
