import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
	baseURL: 'http://localhost:3000/web/api'
})


//给http-request加上拦截器
http.interceptors.request.use(function (config) {
	if (localStorage.token) {
		config.headers.Authorization = 'Bearer ' + (localStorage.token || '') // 请求头，服务端会提取这个请求的token
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});
//全局捕获 给http-response加上拦截器 axios官方文档查看写法  通用的错误处理方法
http.interceptors.response.use(res => {
	return res
}, err => {
	if (err.response.data.message) {
		Vue.prototype.$message({
			type: 'error',
			message: err.response.data.message
		})
		if (err.response.status === 401) {
			router.push('/login')
		}
	}
	return Promise.reject(err)
})
export default http
