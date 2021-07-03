<template>
	<div class="login">
		<div class="d-flex jc-around">
			<router-link tag="div" :to="`/personalcenter`" class="m-4 fs-xxl">返回</router-link>
			<h2 class="flex-1 text-center">登录</h2>
			<router-link tag="div" :to="`/`" class="m-4 fs-xxl w-dl">注册</router-link>
		</div>
		
		<div class="login-body d-flex jc-center">
			<!-- 注册框 -->
			<div class="login-form">
				<form @submit.prevent="login" style="text-align:center">
					<input type="text" v-model="model.username" class="mt-4 mb-2 p-2" placeholder=" 请输入用户名">
					<input type="password" v-model="model.password" class="mt-4 mb-2 p-2" placeholder=" 请输入密码">
					<input type="submit" value="登录" class="mt-4 fs-xxl">
					<div class="login-tip d-flex jc-center">
						还没账号,前往
						<router-link tag="a" :to="`/register`" class="text-Crimson fs-xxl ml-1">注册</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				model: {}
			}
		},
		methods:{
			async login () {
				const res = await this.$http.post('/login', this.model);
				localStorage.token = res.data.token
				localStorage.setItem('username', this.model.username);
				// localStorage.setItem('usericon', this.model.usericon);
				this.$router.push(`/home`)
				this.$message({
					type:'success',
					message:'登录成功'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/_variables.scss';
	.login {
		min-height: 100vh;
		h2 {
			margin-top: 1rem;
			color: map-get($colors, 'grey');
		}
		.w-dl {
			overflow: hidden;
			opacity: 0;
			visibility: hidden;
		}
		.login-body {
			background: rgba(255, 255, 255, 0.4);
			background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
			border-radius: 3rem;
			box-shadow: 0 25px 30px rgba(0, 0, 0, 0.1);
			width: 100vw;
			height: 50vh;
			margin-top: 9rem;
			margin-right: 6rem;
			.login-form {
				padding-top: 5rem;
				.login-tip {
					margin-top: 2.5rem;
				}
				input {
					&:nth-child(3) {
						background-image: linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);
					}
				}
			}
		}
	}
</style>
