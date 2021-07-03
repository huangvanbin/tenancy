<template>
	<div class="userpost">
		<div class="userpost_header d-flex jc-between bg-white">
			<router-link tag="div" :to="`/personalcenter`">
				<img src="../assets/images/btn/huitui.png" class="mt-4 ml-3">
			</router-link>
			<h2 class="fs-28">个人信息</h2>
			<router-link tag="div" :to="`/personalcenter`">
				<img src="../assets/images/btn/zhengque.png" class="mt-4 mr-3" @click="onSubmit()">
			</router-link>
		</div>
		<!-- end of header -->
		<div class="userpost_main">
			<div class="up_username border-bottom pt-4 pb-2 text-center">
				<span class="fs-xl ml-5">用户名</span>
				<input class="bg-white fs-28 text-center" :value="model.username" readonly="readonly"/>
			</div>
			
			<div class="up_usertelphone border-bottom pt-4 pb-2 text-center">
				<span class="fs-xl ml-5">联系方式</span>
				<input class="bg-white fs-28 text-center" :value="model.usertelphone"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				model: {
					usertelphone: '',
				}
			}
		},
		methods: {
			fetchUser () {
				this.model.username = localStorage.getItem('username')
			},
			async onSubmit () {
				let res = await this.$http.get(`/userpost/list/${this.id}`, this.model)
				this.$router.push('/personalcenter') 
			},
		},
		created() {
			this.fetchUser()
		}
	}
</script>

<style lang="scss">
	.userpost {
		.userpost_header {
		}
	}
</style>
