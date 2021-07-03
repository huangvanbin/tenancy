<template>
	<div class="home bg-snow h-a">
		<div class="topbar d-flex jc-center">
			<img src="../assets/images/logo/Tenancy.png" style="width: 100%;">
		</div>
		<!-- end up of logo -->
		<div class="d-flex jc-center my-2 pb-1">
			<input class="p-2 pl-4 bg-whiteSmoke text-grey-1" placeholder="请输入小区名开始找房" v-model="searchRoom"/>
			<i class="iconfont icon-search ml-1 mt-3 i-size text-grey-1" @click="searchBtn"></i>
		</div>
		<!-- end up of input -->
		<swiper :options="swiperOptions">
			<swiper-slide v-for="(item, vb) in ads" :key="item.vb">
				<img class=" sw-img" :src="item.image">
			</swiper-slide>
			<div class="swiper-pagination pagination-home" slot="pagination"></div>
		</swiper>
		<!-- end up of swiper -->
		
		<m-card icon="jinrizuire" title="最热房源">
			<router-link tag='div'
			v-for="(item, index) in roomHots.slice(0, 10)" :key="item._id"
			:to="`/room/detail/${item._id}`"
			class="room_item bg-white w-100 d-flex mt-3" v-if="rooms">
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
		</m-card>
		
		<m-card icon="HWD" title="精选好房" :room="rooms">
			<router-link tag='div'
			v-for="(item, index) in rooms.slice(6, 11)" :key="item._id"
			:to="`/room/detail/${item._id}`"
			class="room_item bg-white w-100 d-flex mt-3 " v-if="rooms">
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
			<div class="room_more d-flex jc-center">
				<router-link tag="div" :to="`/room/list`">
					<button class="mb-2">加载更多</button>
				</router-link>
			</div>
		</m-card>

		<div class="room_footer room_hidden">
			<img src="../assets/images/img/white.png" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				ads: [],
				searchRoom: '', // 想要搜索的房屋
				searchData: '',
				rooms: [],
				hots: '',
				swiperOptions: {
				  pagination: {
						el: '.pagination-home'
					}
			  }
			}
		},
		methods: {
			async fetchAd() {
				const res = await this.$http.get('ad/list');
				this.ads = res.data
			},
			async fetchRoom(){
			  const res = await this.$http.get('room/list');
			  this.rooms = res.data
			},
			searchBtn () {
				let searchRoom = this.searchRoom;
				if (searchRoom) {
					this.searchData = this.rooms.filter(
						value => value.name.indexOf(this.searchRoom) !== -1
					)
				}
				this.$router.push({path: '/search/list', query: {name: this.searchData}})
			},
			
		},
		created() {
			this.fetchAd()
			this.fetchRoom()
		},
		// 与v-for筛选出最热房源
		computed: {
			roomHots () {
				return this.rooms.filter((item) => {
					return item.hots >= 8
				})
			}
		}
	}
</script>
<style lang="scss">
	@import '../assets/scss/_variables.scss';
	/* 去除input的边框 */
 input {
	width: 77%;
	height: 35px;
	border-radius:17px;
	outline-color: invert;
	outline-style: none;
	outline-width: 0px;
	border: none;
	border-style: none;
	text-shadow: none;
	-webkit-appearance: none;
	-webkit-user-select: text;
	outline-color: transparent;
	box-shadow: none;
	}
	.pagination-home {
		.swiper-pagination-bullet {
			opacity: 1;
			border-radius: 0.125rem;
			background: map-get($colors, 'white');
			&.swiper-pagination-bullet-active {
				background: map-get($colors, 'LightSteelBlue');
			}
		}
	}
	.i-size {
		font-size: 22px;
	}
	.room_more {
		button {
			width: 140px;
			line-height: 20px;
			padding: 0.3rem;
			margin-top: 0.5rem;
			border-radius: 15px;
			border: none;
			// background-color: map-get($colors, 'Honeydew');
			background-image: linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);
		}
	}
	// .room_footer img {
	// 	width: 100%;
	// 	height: 4rem;
	// }
</style>
