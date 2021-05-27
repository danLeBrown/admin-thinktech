import Api from './Api'
// import Cookie from 'js-cookie'

export default {
  getCookie(reset) {
    if (reset) {
      return Api.get('/csrf-cookie')
    }
    // let _token = Cookie.get('XSRF-TOKEN');
    // if (_token) {
    //     return new Promise(resolve => {
    //         resolve(_token);
    //     });
    // }
    return Api.get('/csrf-cookie')
  },
}
