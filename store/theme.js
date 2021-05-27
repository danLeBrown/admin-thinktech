const state = () => ({
  dark: false,
})

const getters = {
  dark: (state) => state.dark,
}

const actions = {}

const mutations = {
  setDarkMode: (state, dark) => {
    return (state.dark = dark)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
