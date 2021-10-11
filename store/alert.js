const state = () => ({
  errors: [],
  success: [],
})

const getters = {
  errors: (state) => state.errors,
  success: (state) => state.success,
}

const actions = {
  getAlert: ({ commit }, res) => {
    if ([200, 201].includes(res.status)) {
      return commit('pushMessage', res.data.data.message)
    }
    if (res.status === 500) {
      return commit('pushError', 'Oops! An error occured from our end.')
    }
    Object.keys(res.data.errors).forEach((key) => {
      return commit('pushError', res.data.errors[key][0])
    })
  },
}

const mutations = {
  pushError: (state, data) => {
    return state.errors.push(data)
  },
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
