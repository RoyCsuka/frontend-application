import Vue from 'vue' // vue globaal inladen
import App from './App.vue' // vue app globaal inladen

import './style.scss'

Vue.config.productionTip = false

new Vue({ //
  render: h => h(App),
}).$mount('#app')
