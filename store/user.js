import User from '~/assets/js/api/User'
const state = () => ({
  user: {
    is_ready: false,
  },
})

const getters = {
  user: (state) => state.user,
}

const actions = {
  updateCurrentUser: async ({ commit }, user) => {
    // const res = await User.update(formData)

    return commit('setUser', user)
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
    user.is_ready = true
    return (state.user = user)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
