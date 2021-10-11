function isLoggedIn() {
  return localStorage.getItem('admin_thinktech_auth_token')
}

export default function ({ store, redirect, route }) {
  /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
  // console.log(store)
  if (!isLoggedIn()) {
    return redirect({
      name: 'login',
      query: { redirect: route.fullPath },
    })
  }
}
