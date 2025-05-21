import { createStore } from 'vuex'
import { req } from '@/network/RequestConfig'

// store only seems unstable, combining with local storage is more robust
export default createStore({
  state: {
    user: {
      isLogin: window.localStorage.getItem("token") ? true : false,
      name: window.localStorage.getItem("uname")
    },
    cartCount: parseInt(window.localStorage.getItem("cartCount")) || 0,
  },
  getters: {
  },
  mutations: {
    setIsLogin(state, v) {
      state.user.isLogin = v
    },
    setUName(state, v) {
      state.user.name = v
    },
    setCc(state, payload) {
      state.cartCount = payload.c
    },
  },
  actions: {
    updateCc({ commit, state }) {
      if (state.user.isLogin) {
        req({ url: "/cart/count" }).then(res => {
          if (res.status == 200) {
            const count = res.data.nums
            // const count = res.data.nums__sum
            window.localStorage.setItem("cartCount", count)
            commit("setCc", { c: count })
          }
        })
      }
    }
  },
  modules: {
  }
})
