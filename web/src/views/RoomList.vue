<template>
	<div class="bg-white roomlist">
		<div class="room_header d-flex jc-center">
			<router-link tag="div" :to="`/home`">
				<img src="../assets/images/btn/yemian.png" class="mt-4">
			</router-link>
			<h2 class="ml-3 fs-28">房源展示</h2>
		</div>
		<!-- end of head -->
		<div class="room_title ml-4 pl-1">
			<strong class="fs-ic">已经为您找到<span class="fs-ie">{{rooms.length}}</span>套租房</strong>
		</div>
		<!-- end of title -->
		<div class="room_span d-flex fs-xl ml-2 mr-2 mt-4 border-bottom">
			<span :class="current == 'stochastic' ? 'active' : ''" @click="doStochastic">随机排序</span>
			<span :class="current == 'price' ? 'active' : ''" @click="doPrice">价格降序<i class="iconfont icon-xiangxia" style="font-size: 0.5rem;"></i></span>
			<span :class="current == 'area' ? 'active' : ''" @click="doArea">面积降序<i class="iconfont icon-xiangxia" style="font-size: 0.5rem;"></i></span>
		</div>
		<!-- end of sort -->
		<router-link tag='div'
		v-for="(item, index) in rooms.slice((currentPage-1)*pagesize, currentPage*pagesize)" :key="item._id"
		:to="`/room/detail/${item._id}`"
		class="room_item bg-white w-100 d-flex mt-3 ml-2 mr-2" v-if="rooms">
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
		<!-- end of list -->
		<el-pagination 
			class="page mt-1"
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="pagesize"         
			layout="total, sizes, prev, next, jumper"
			:total="rooms.length">    //这是显示总共有多少数据，
		</el-pagination>
		<!-- end of page -->
	</div>
</template>

<script>
	export default {
		props: {
			id: { require: true }
		},
		data() {
			return {
				// rooms: null,
				rooms: [],
				currentPage: 1, // 初始页
				pagesize: 10,    // 每页的数据
				current: '',
			}
		},
		methods: {
			async fetch() {
			  const res = await this.$http.get('room/list');
			  this.rooms = res.data
				console.log(res.data.length)
			},
			// 初始页currentPage、初始每页数据数pagesize和数据data
			handleSizeChange: function (size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage){
				this.currentPage = currentPage;
			},
			// 排序
			doSort (prop) {
				return function (a, b) {
					let val1 = a[prop];
					let val2 = b[prop];
					return val2 - val1;
				};
			},
			// 随机排序
			doStochastic() {
				this.rooms.sort(() => Math.random() - 0.5);
				this.current = "stochastic";
			},
			// 价格降序
			doPrice() {
				this.rooms.sort(this.doSort("monthly"));
				this.current = "price"
			},
			// 面积降序
			doArea() {
				this.rooms.sort(this.doSort("area"));
				this.current = "area"
			}, 
		},
		created() {
			this.fetch()
		},		
	}
</script>

<style lang="scss">
	@import '../assets/scss/_variables.scss';
	.roomlist {
		.room_title {
			span {
				padding: 0 0.2rem;
				color: map-get($colors, 'Crimson');
			}
		}
		.room_span {
			span {
				padding: 0 0.8rem;
				padding-bottom: 0.5rem;
				border-bottom: 1px solid transparent;
				&.active {
					padding-bottom: 0.5rem;
					color: map-get($colors, 'Crimson');
					border-bottom: 1px solid map-get($colors, 'Crimson');
				}
			}
		}
		.page {
			.el-pagination__total {
				margin-left: 2px ;
				margin-right: 12px;
			}
			.el-input{
				margin: 0 1px !important;
			}
			.el-pagination__jump {
				margin-left: 17px ;
			}
		}
	}
</style>
