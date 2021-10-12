const state = () => ({
  success: [],
})

const getters = {
  success: (state) => state.success,
}

const actions = {
  getAlert: ({ commit }, res) => {
    return commit('pushMessage', res.data.data.message)
  },
}

const mutations = {
  pushMessage: (state, data) => {
    return state.success.push(data)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
