const state = {
  source: null,
  domain: null,
  repo: null,
}

const mutations = {
  UPDATE(state, payload) {
    state.source = payload.source
    state.domain = payload.domain
    state.repo = payload.repo
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
