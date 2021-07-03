import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import SearchList from '../views/SearchList.vue'
import Community from '../views/Community.vue'
import RoomList from '../views/RoomList.vue'
import RoomDetail from '../views/RoomDetail.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import ArticlePost from '../views/ArticlePost.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import UserPost from '../views/UserPost.vue'
import Publish from '../views/Publish.vue'
import Error from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/login', component: Login, meta: { isPublic: true } },
	{ path: '/register', component: Register, meta: { isPublic: true } },
  {
    path: '/',
    component: Main,
		redirect:'/home',
		children: [
			// { path: '/', component: Home },
			{ path: '/home', name: '首页', component: Home, meta: { isPublic: true }},
			{ path: '/community', name: '社区', component: Community, meta: { isPublic: true }},
			{ path: '/publish', name: '发布', component: Publish,  },
			{ path: '/personalcenter', name: '我的', component: PersonalCenter, },
		]
  },
	{ path: '/room/list', component: RoomList, props: true, meta: { isPublic: true }},
	{ path: '/room/list/:id', component: RoomList, props: true, meta: { isPublic: true }},
	{ path: '/room/detail/:id', component: RoomDetail, props: true, meta: { isPublic: true }},
	{ path: '/search/list', component: SearchList, props: true, meta: { isPublic: true }},
	{ path: '/article/post', component: ArticlePost, props: true, },
	{ path: '/article/detail/:id', component: ArticleDetail, props: true, meta: { isPublic: true }},
	{ path: '/userpost/list', component: UserPost, props: true, meta: { isPublic: true } },
	{ path: '*', component: Error },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {  //如果不是公开访问的页面并且不存在用户token时跳转到登录页
    return next('/login')
  }
  next()
})
export default router
