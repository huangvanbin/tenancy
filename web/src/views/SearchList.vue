<template>
	<div class="">
		<div class="room_header d-flex jc-between bg-white">
			<router-link tag="div" :to="`/home`">
				<img src="../assets/images/btn/huitui.png" class="mt-4 ml-3">
			</router-link>
			<h2 class="fs-28">搜索展示</h2>
			<router-link tag="div" :to="`/home`">
				<img src="../assets/images/btn/yemian.png" class="mt-4 mr-3">
			</router-link>
		</div>
		
		<router-link tag='div' 
		v-for="item in list" :key="item._id"
		:to="`/room/detail/${item._id}`"
		class="room_item bg-white w-100 d-flex mt-3 ml-2">
			<img :src="item.images[0].img" class="mb-2">
			<div class="flex-column ml-1">
				<strong class="pl-2 fs-ic">{{item.name}}</strong>
				<div class="flex-wrap mt-3">
					<span class="pl-2 fs-ic text-Crimson">{{item.monthly}}</span>
					<span class="pl-2 fs-lg">元 / 月</span>
				</div>
				<p class="pl-2 fs-xs">面积: {{item.area}}㎡</p>
				<p class="pl-2 fs-xs">楼层: {{item.floor}}层</p>
			</div>
		</router-link>
		
		<div v-if="list.length == 0" class="list-img">
			<!-- <p class="fs-lg">暂无结果！</p> -->
			<img src="../assets/images/logo/kong.png">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		methods: {
			showList() {
			  this.list = this.$route.query.name
			}
		},
		created() {
			this.showList()
		}
	}
</script>

<style lang="scss">
	.room_item {
		// height: auto;
		box-shadow: 2px 2px 4px #f1f1f1;
		img {
			width: 45%;
		}
	}
	.list-img {
		text-align: center;
		vertical-align: middle;
	}
</style>
