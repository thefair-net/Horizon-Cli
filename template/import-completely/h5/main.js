import Vue from 'vue'
import App from './App.vue'
import Horizon from 'horizon-ui'
import 'horizon-ui/static/theme.scss'

Vue.use(Horizon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
