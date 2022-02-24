import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import eventBus from '@/utils/eventBus'
Vue.use(eventBus)

Vue.config.productionTip = false

window.addEventListener(
  'pywebviewready',
  () => {
    window.$api = pywebview.api
    window.log = pywebview.api.log
    store.dispatch('api/getMakeConfig')
    store.dispatch('api/getFolderList')
  },
  true
)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
