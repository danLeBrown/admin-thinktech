import Api from './Api'

const AuthApi = Api
AuthApi.defaults.headers.common.Authorization =
  'Bearer ' + localStorage.getItem('admin_thinktech_auth_token')
export default AuthApi
