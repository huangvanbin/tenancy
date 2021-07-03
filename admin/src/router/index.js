import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import EquipmentEdit from '../views/EquipmentEdit.vue'
import EquipmentList from '../views/EquipmentList.vue'
import RoomEdit from '../views/RoomEdit.vue'
import RoomList from '../views/RoomList.vue'
import CommentEdit from '../views/CommentEdit.vue'
import CommentList from '../views/CommentList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminEdit from '../views/AdminEdit.vue'
import AdminList from '../views/AdminList.vue'
import UserList from '../views/UserList.vue'


Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { isPublic: true }
	},
  {
    path: '/', // 父组件
    name: 'main',
    component: Main,
		children: [ // 子组件
			{ path: '/categories/create', component: CategoryEdit }, // 分类页面
			{ path: '/categories/edit/:id', component: CategoryEdit, props: true }, //分类编辑页面
			{ path: '/categories/list', component: CategoryList }, // 分类列表
			
			{ path: '/equipments/create', component: EquipmentEdit },
			{ path: '/equipments/edit/:id', component: EquipmentEdit, props: true },
			{ path: '/equipments/list', component: EquipmentList },
			
			{ path: '/rooms/create', component: RoomEdit },
			{ path: '/rooms/edit/:id', component: RoomEdit, props: true },
			{ path: '/rooms/list', component: RoomList },
			
			{ path: '/articles/create', component: ArticleEdit },
			{ path: '/articles/edit/:id', component: ArticleEdit, props: true },
			{ path: '/articles/list', component: ArticleList },
			
			{ path: '/ads/create', component: AdEdit },
			{ path: '/ads/edit/:id', component: AdEdit, props: true },
			{ path: '/ads/list', component: AdList },
			
			{ path: '/admins/create', component: AdminEdit },
			{ path: '/admins/edit/:id', component: AdminEdit, props: true },
			{ path: '/admins/list', component: AdminList },
			
			{ path: '/users/list', component: UserList },
		]
  }
]

const router = new VueRouter({
  routes
})

//每次切换路由时的处理办法
router.beforeEach((to, from, next) => {
	if (!to.meta.isPublic && !localStorage.token) { //如果不是公开访问
		
		return next('/login')
	}
	next()
})
export default router
