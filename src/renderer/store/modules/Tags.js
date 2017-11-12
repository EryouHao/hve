const state = {
  tags: [],
}

const mutations = {
  UPDATE_TAGS(state, payload) {
    state.tags = payload
  },
  ADD_TAG(state, tag) {
    state.tags.push(tag)
  },
}

const actions = {
  updateTags({ commit }, tags) {
    commit('UPDATE_TAGS', tags)
  },
  addTag({ commit }, tag) {
    commit('ADD_TAG', tag)
  },
}

export default {
  state,
  mutations,
  actions,
}
