<template>
	<div class="personalcenter">
		<div class="per-icon">
			<avatar 
			:username="model.username"
			:size="140" 
			color="#B0C4DE"
			backgroundColor="white"
			class="per-avatar"></avatar>
		</div>
		<div class="personal-name d-flex jc-center mt-5">
			<h1 class="">{{model.username}}</h1>
		</div>
		<!-- end of name -->
		<div class="per-main ml-2 mr-2">
			<div class="d-flex jc-between border-bottom pl-5 pr-5">
				<p class="fs-iic text-grey">个人信息</p>
				<router-link tag="div" :to="`userpost/list`">
					<img src="../assets/images/btn/qianjin.png" class="mt-4 ml-3">
				</router-link>
			</div>
			<div class="d-flex jc-between border-bottom pl-5 pr-5">
				<p class="fs-iic text-grey">我的发布</p>
				<router-link tag="div" :to="`userpost/list`">
					<img src="../assets/images/btn/qianjin.png" class="mt-4 ml-3">
				</router-link>
			</div>
			<div class="d-flex jc-between border-bottom pl-5 pr-5">
				<p class="fs-iic text-grey">我的评论</p>
				<router-link tag="div" :to="`userpost/list`">
					<img src="../assets/images/btn/qianjin.png" class="mt-4 ml-3">
				</router-link>
			</div>
		</div>
		<!-- end of my_roomPost -->
		<div class="per-btn d-flex jc-center mt-5">
			<input type="button" value="退出登录" @click="quit">
		</div>
	</div>
</template>

<script>
	import Avatar from 'vue-avatar'
	export default {
		data () {
			return {
				model: {},
				per: ''
			}
		},
		components: {
			Avatar
		},
		methods: {
			fetchUser () {
				this.model.username = localStorage.getItem('username')
			},
			quit () {
				localStorage.clear()
				this.$router.push('/login')
			}
		},
		created() {
			this.fetchUser()
			// this.fetchIcon()
		}
	}
</script>

<style lang="scss">
	.personalcenter {
		.per-icon {
			.per-avatar {
				margin: 0 auto;
				margin-top: 5rem;
				box-shadow: 0 10 35 rgba(0, 0, 0, 0.1);
			}
		}
	}
</style>
