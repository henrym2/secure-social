import Vue from 'vue'
import App from './App.vue'
import dotenv from 'dotenv'
import { Crypt, RSA } from "hybrid-crypto-js"
const pwbox = require("pwbox")
const { JsonBox } = require("jsonbox-node")
dotenv.config()

const jsonbox = new JsonBox()

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from './store'
import { randomBytes } from 'crypto'
var entropy = new String(randomBytes(1024))
var crypt = new Crypt({entropy: entropy, md: 'sha512'})
var rsa = new RSA({entropy: entropy})



Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.prototype.$jsonbox = jsonbox
Vue.prototype.$pwbox = pwbox
Vue.prototype.$crypt = crypt
Vue.prototype.$rsa = rsa

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
