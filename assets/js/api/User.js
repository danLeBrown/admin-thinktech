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
  async stats() {
    await Csrf.getCookie()
    return Api.get('/admin/analytics-stats')
  },
}