import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import router from './router'
import axios from 'axios'

// import EleForm from 'vue-ele-form'
// //注册vue-ele-form
// Vue.use(EleForm)

Vue.config.productionTip = false

const http = axios.create({
  baseURL:process.env.VUE_APP_API_URL,
  timeout: 600000,
})
Vue.prototype.$http = http;
Vue.prototype.$axios = http;
window.axios = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
