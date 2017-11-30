import { website as types } from '../types'

const state = {
  title: '',
  pageSize: 5,
  menus: [],
}

const mutations = {
  [types.mutations.UPDATE_SETTING](state, payload) {
    state.title = payload.title
    state.pageSize = payload.pageSize
    state.menus = payload.menus
  },
}

const actions = {
  [types.actions.UPDATE_SETTING]({ commit }, form) {
    console.log('form: ', form)
    commit(types.mutations.UPDATE_SETTING, form)
  },
}

export default {
  state,
  mutations,
  actions,
}
