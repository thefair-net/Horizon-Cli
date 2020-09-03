import Vue from 'vue'
import App from './App.vue'
import 'horizon-ui/static/theme.scss'
import {
  Feed,
  FeedCard,
  Toast,
  ImageViewer
  // ...
} from 'horizon-ui'

Vue.use(Feed)
// or
Vue.component(Feed.name, Feed)

Vue.use(FeedCard)
// or
Vue.component(FeedCard.name, FeedCard)

Vue.prototype.$toast = Toast
Vue.prototype.$imgViewer = ImageViewer
// ...

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
