<template>
	<div class="err">
		<div class="err-world text-center">
			<h2 class="fs-28">很抱歉你访问的页面不存在</h2>
			<h3 class="fs-ic">Page not found</h3>
		</div>
		<div class="err-btn text-center">
			<router-link tag="button" to="/home" class="r-btn fs-ic">返回首页</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../assets/scss/_variables.scss';
	.err {
		background: url(../assets/images/logo/404.png) no-repeat center top;
		// position: relative;
		.err-world {
			color: map-get($colors, 'zdyBlue');
			// text-shadow: 0 0 0.2rem #87F, 0 0 0.2rem #87F, 0 0 0.2rem #87F; // 霓虹发光
			h2 {
				padding-top: 12rem;
				text-shadow: 1px 1px white, -1px -1px #444 // 浅色阴影
			}
			h3 {
				padding-top: 1rem;
				text-shadow: -1px -1px white, 1px 1px #333 // 深色阴影
			}
		}
		.err-btn {
			padding-top: 11rem;
			.r-btn {
				width: 11rem;
				height: 2.5rem;
				line-height: 2rem;
				border-radius: 1rem;
				border: 1px solid #b4d9ff;
				background-color: map-get($colors, 'bjs');
				color: map-get($colors, 'white');
				text-shadow: black 0.1rem 0.1rem 0.2rem
			}
		}
	}
</style>
