import User from '~/assets/js/api/User'
const state = () => ({
  user: {
    id: 1,
    name: 'The Brown Guy',
    email: 'thebrowndev@gmail.com',
    bio: 'Nothing good lasts forever!',
  },
})

const getters = {
  user: (state) => state.user,
}

const actions = {
  updateCurrentUser: async ({ commit }, formData) => {
    const res = await User.update(formData)
    return commit('setUser', res.data.data)
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
