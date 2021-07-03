<template>
	<div id="app">
		<!-- <div class="nav d-flex jc-around py-2">
			<div class="nav-item" v-for="(item, index) of list" :key="index" :class="{ active:index == num }"
				@click="addClassName(index)">
				<router-link tag="div" :to="item.path">
					<img :src="item.icon" v-show="num != index" :to="item.path">
					<img :src="item.active" v-show="num == index" :to="item.path">
					<p class="mt-2 fs-xl mb-1 text-dark-1">{{item.name}}</p>
				</router-link>
			</div>
		</div> -->
		<div class="nav d-flex jc-around py-2">
			<div class="nav-item" v-for="(item, index) of list" :key="index"
				:class="{'router-link-exact-active':ind == index}" @click="addClassName(index)">
				<router-link tag="div" :to="{path:item.path, query:{item:index}}">
					<img :src="item.icon" v-show="ind != index" :to="item.path">
					<img :src="item.active" v-show="ind == index" :to="item.path">
					<p class="mt-2 fs-xl mb-1 text-dark-1">{{item.name}}</p>
				</router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				ind: '0',
				list: [{
						icon: require('../assets/images/btn/yemian.png'),
						active: require('../assets/images/btn/yemian-1.png'),
						name: '首 页',
						path: '/home'
					},
					{
						icon: require('../assets/images/btn/shequ.png'),
						active: require('../assets/images/btn/shequ-1.png'),
						name: '社 区',
						path: '/community'
					},
					{
						icon: require('../assets/images/btn/fabu.png'),
						active: require('../assets/images/btn/fabu-1.png'),
						name: '发 布',
						path: '/publish'
					},
					{
						icon: require('../assets/images/btn/wode.png'),
						active: require('../assets/images/btn/wode-1.png'),
						name: '我 的',
						path: '/personalcenter'
					},
				]
			}
		},
		methods: {
			addClassName(index) {
				this.ind = index;
			},
		},
		mounted() {
			if (this.$route.query.item) {
				this.ind = this.$route.query.item;
			} else {
				this.ind = 0;
			}
		}
	}
</script>

<style scoped>
	.nav {
		position: fixed;
		z-index: 999;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		box-shadow: 0 -1px 6px rgb(226, 225, 225);
	}
</style>
