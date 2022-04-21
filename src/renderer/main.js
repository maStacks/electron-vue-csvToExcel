import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// 简写console.log 19-07-15 阿彪
window.log = function (a) {
  let args = [...arguments];
  args.forEach((itme, index) => {
    args[index] = JSON.parse(JSON.stringify(itme))
  })
  return console.log(...args)
};
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
