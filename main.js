
// 下面的这些是封装的
import App from './App'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount('#app')
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import request from './utils/request.js'
export function createApp() {
  const app = createSSRApp(App)
  // app.config.globalProperties.$request = request
  app.config.globalProperties.$request = request
  return {
    app
  }
}
// #endif
