import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import ElementUI from 'element-ui'
import fetch from './utils/fetch'

import BackButton from './components/back-button/index'

import './assets/font/iconfont.css'
import './assets/scss/main.scss'

import './permission'

Vue.use(BackButton)
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: require('./assets/images/lazy-img-load.gif'),
    error: require('./assets/images/lazy-img-error.png'),
    attempt: 1
})


// 注册过滤器
import * as filters from './filters';
Object.keys(filters)
    .forEach(key => Vue.filter(key, filters[key]));

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = fetch

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
