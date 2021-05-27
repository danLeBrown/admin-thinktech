const state = () => ({
  author: {},
})

const getters = {
  author: (state) => state.author,
}

const actions = {}

const mutations = {
  setAuthor: (state, author) => {
    return (state.author = author)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
