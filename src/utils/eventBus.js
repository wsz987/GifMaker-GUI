import Vue from 'vue'
const eventBus = new Vue()
// window.eventBus = eventBus
export default {
  install(target, options) {
    target.prototype.$eventBus = eventBus
  },
}

export { eventBus }
