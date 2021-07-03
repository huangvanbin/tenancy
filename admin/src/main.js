import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

import './style.css'

import http from './http.js'
Vue.prototype.$http = http

Vue.mixin({
	computed: {
		uploadUrl() {
			return this.$http.defaults.baseURL+'/upload'
		}
	},
	methods: {
		getAuthHeaders() {
			return {
				Authorization: `Bearer ${localStorage.token || ''}`
			}
		}
	}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
