const state = () => ({
  user: {
    is_ready: false,
    auth: false,
  },
})

const getters = {
  user: (state) => state.user,
}

const actions = {
  updateCurrentUser: ({ commit }, user) => {
    return commit('setUser', user)
  },
  storeUser: ({ commit }, data) => {
    return commit('setUser', data)
  },
  changeAuth: ({ commit }) => {
    return commit('setUserAuth')
  },
}

const mutations = {
  setUser: (state, user) => {
    user.is_ready = true
    user.auth = true
    return (state.user = user)
  },
  setUserAuth: (state) => {
    return (state.user.auth = true)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
