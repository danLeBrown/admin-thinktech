import User from '~/assets/js/api/User'
const state = () => ({
  user: {},
})

const getters = {
  user: (state) => state.user,
}

const actions = {
  updateCurrentUser: async ({ commit }, formData) => {
    const res = await User.update(formData)
    return commit('setUser', res.data.data.user)
  },
  getUser: async ({ commit }, formData) => {
    const res = await User.getCurrent()
    return commit('setUser', res.data.data.user)
  },
  storeUser: ({ commit }, data) => {
    return commit('setUser', data)
  },
}

const mutations = {
  setUser: (state, user) => {
    return (state.user = user)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
