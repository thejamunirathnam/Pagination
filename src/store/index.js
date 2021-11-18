import { createStore } from "vuex";

export default createStore({
  state: {
    page: 1,
  },
  mutations: {
    pagechanged(state, page) {
      state.page = page;
    },
  },
  actions: {
    onClickPreviousPage({ commit, state }) {
      commit("pagechanged", state.page - 1);
    },
    onClickPage({ commit }, page) {
      commit("pagechanged", page);
    },
    onClickNextPage({ commit, state }) {
      commit("pagechanged", state.page + 1);
    },
  },
  modules: {},
});
