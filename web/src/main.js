import Vue from 'vue'
import App from './App.vue'
import router from './router'

import http from './http.js'
Vue.prototype.$http = http

import './assets/scss/style.scss'
// iconfont
import './assets/images/icon/iconfont.css'
// 全局引入Card组件
import Card from './components/Card.vue'
Vue.component('m-card', Card)

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import Swiper2, {Navigation, Pagination} from 'swiper'; // 这行代码很关键
import './plugins/element.js'
Swiper2.use([Navigation, Pagination]); // 这行代码很关键


Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
