import Vue from 'vue'
import App from './App.vue'
import dotenv from 'dotenv'
const { JsonBox } = require("jsonbox-node")
dotenv.config()

const jsonbox = new JsonBox(process.env.VUE_APP_JSON_BOX)

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  jsonbox,
  router,
  render: h => h(App)
}).$mount('#app')
