const state = {
  title: '',
  pageSize: 5,
}

const mutations = {
  UPDATE_SETTING(state, payload) {
    state.title = payload.title
    state.pageSize = payload.pageSize
  },
}

const actions = {
  updateWebSetting({ commit }, form) {
    commit('UPDATE_SETTING', form)
  },
}

export default {
  state,
  mutations,
  actions,
}
