const state = {
  source: null,
  domain: null,
  repo: null,
  branch: null,
  email: null,
  username: null,
}

const mutations = {
  UPDATE(state, payload) {
    state.source = payload.source
    state.domain = payload.domain
    state.repo = payload.repo
    state.branch = payload.branch
    state.token = payload.token
    state.email = payload.email
    state.username = payload.username
  },
}

const actions = {
  updateSetting({ commit }, form) {
    commit('UPDATE', form)
  },
}

export default {
  state,
  mutations,
  actions,
}
