import AuthApi from './AuthApi'
import Csrf from './Csrf'
export default {
  async update(formData) {
    await Csrf.getCookie()
    return AuthApi.post('/author/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  async register(formData) {
    await Csrf.getCookie(true)
    return AuthApi.post('/register', formData)
  },
  async login(formData) {
    await Csrf.getCookie(true)
    return AuthApi.post('/login', formData)
  },
  async stats() {
    await Csrf.getCookie()
    return AuthApi.get('/author/analytics-stats')
  },
  async getCurrent() {
    await Csrf.getCookie()
    return AuthApi.get('/user')
  },
}
