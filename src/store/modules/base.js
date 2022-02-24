const state = () => ({
  actionTab: null,
})
const getters = {
  actionTab: (state) => state.actionTab,
}

const mutations = {
  setActionTab(state, actionTab) {
    state.actionTab = actionTab
  },
}
const actions = {
  // setActionTab({ commit }, actionTab) {
  //   commit('setActionTab', actionTab)
  // },
}
export default { state, getters, mutations, actions }
