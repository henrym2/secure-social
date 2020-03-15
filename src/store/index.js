import Vue from 'vue'
import Vuex from 'vuex'
const { JsonBox } = require("jsonbox-node")
const jsonbox = new JsonBox()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token'),
    user: {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        jsonbox.read(process.env.VUE_APP_BOX_ID, "users", {query: `email:${user.email},password:${user.password}`, limit: 1})
        .then((result) => {
          const userData = result[0]
          if (result.length <= 0) {
            reject()
          }
          const token = userData._id
          const user = userData
          localStorage.setItem('token', token)
          commit('auth_success', token, user)
          resolve(userData)
        }).catch((err) => {
          commit('auth_error')
          console.log(err)
          localStorage.removeItem('token')
          reject(err)
        });
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        jsonbox.create(user, process.env.VUE_APP_BOX_ID, "users")
        .then((result) => {
          const token = result._id
          const user = result
          localStorage.setItem('token', token)
          console.log(localStorage.getItem('token'))
          commit('auth_success', token, user)
          resolve(result)
        }).catch((err) => {
          console.error(err)
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        });
      })
    },
    logout({commit}) {
      //eslint-disable-next-line
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        resolve()
      })
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
  
})


