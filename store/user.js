const state = () => ({
  user: {
    id: 1,
  },
})

const getters = {
  user: (state) => state.user,
}

const actions = {}

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
