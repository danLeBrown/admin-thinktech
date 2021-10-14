import Api from './Api'
import Csrf from './Csrf'
export default {
  async update(formData) {
    await Csrf.getCookie()
    return Api.post('/author/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'Bearer ' + localStorage.getItem('admin_thinktech_auth_token'),
      },
    })
  },
  async register(formData) {
    await Csrf.getCookie()
    return Api.post('/register', formData)
  },
  async login(formData) {
    await Csrf.getCookie()
    return Api.post('/login', formData)
  },
  async stats() {
    await Csrf.getCookie()
    return Api.get('/author/analytics-stats', {
      Authorization:
        'Bearer ' + localStorage.getItem('admin_thinktech_auth_token'),
    })
  },
  async getCurrent() {
    await Csrf.getCookie()
    return Api.get('/user', {
      Authorization:
        'Bearer ' + localStorage.getItem('admin_thinktech_auth_token'),
    })
  },
}
