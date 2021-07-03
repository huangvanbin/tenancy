<template>
	<div class="card bg-white p-3">
		<div class="card-header d-flex pb-3">
			<i class="iconfont text-Crimson fs-xxl" :class="`icon-${icon}`"></i>
			<div class="fs-ic px-3 w-size">{{title}}</div>
			<div class="fs-xl w-size hvb">{{title_1}}</div>
			<!-- <i class="iconfont text-Crimson fs-xxl" :class="`icon-${icon}`"></i> -->
		</div>
		<div class="card-body">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			icon: { type: String, require: true },
			title: { type: String, require: true },
			title_1: { type: String, require: true }
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/_variables.scss';
	.card-header {
		border-bottom: 1px solid map-get($colors, 'whiteSmoke');
		.w-size {
			font-weight: 800;
		}
	}
</style>
