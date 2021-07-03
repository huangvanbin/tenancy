<template>
	<div class="bg-white" v-if="rooms" >
		<div class="room_header d-flex jc-between">
			<router-link tag="div" :to="`/room/list`">
				<img src="../assets/images/btn/huitui.png" class="mt-4 ml-3">
			</router-link>
			<h2 class="fs-28">房屋详情</h2>
			<router-link tag="div" :to="`/home`">
				<img src="../assets/images/btn/yemian.png" class="mt-4 mr-3">
			</router-link>
		</div>
		
		<div class="room_body mt-1">
			
			<div class="room_ad" v-if="rooms.images">
				<swiper :options="swiperOptions">
					<swiper-slide v-for="(item, vb) in rooms.images" :key="item.vb">
						<img class="sw_img sw-img" :src="item.img">
					</swiper-slide>
					<div class="swiper-pagination pagination-home" slot="pagination"></div>
				</swiper>
			</div>
			<!-- end of ad-images -->
			
			<div class="d-flex jc-between mt-2 room_body_header1">
				<h2 class="ml-4">{{rooms.name}}</h2>
				<h3 class="text-Crimson mr-5">{{rooms.monthly}}元 / 月</h3>
			</div>
			
			<div class="d-flex jc-around text-center room_body_header2">
				<div class="room_body_item ">
					<p>户型</p>
					<p class="text-Crimson fs-xl">{{rooms.categories.map(v => v.name).slice(0, 1).join()}}</p>
				</div>
				<div class="room_body_item">
					<p>出租</p>
					<p class="text-Crimson fs-xl">{{rooms.categories.map(v => v.name).slice(1).join()}}</p>
				</div>
				<div class="room_body_item">
					<p>楼层</p>
					<p class="text-Crimson fs-xl">{{rooms.floor}}层</p>
				</div>
				<div class="room_body_item">
					<p>面积</p>
					<p class="text-Crimson fs-xl">{{rooms.area}}㎡</p>
				</div>
			</div>
			<!-- end of 导栏 -->
			
			<m-card icon="" title="房屋信息" class="r_equipment">
				<div class="fs-xl mt-3 ml-3">基本信息</div>
				<div class="d-flex jc-around text-center mt-3 mb-4">
					<div v-for="item in rooms.equipment1" :key="item.name">
						<img :src="item.icon" class="icon">
						<div class="fs-sm">{{item.name}}</div>
					</div>
				</div>
				<div class="fs-xl mt-3 ml-3">配套设施</div>
				<div class="d-flex jc-around text-center mt-3">
					<div v-for="item in rooms.equipment2" :key="item.name">
						<img :src="item.icon" class="icon">
						<div class="fs-sm">{{item.name}}</div>
					</div>
				</div>
			</m-card>
			<!-- end of 房屋信息 -->
			
			<m-card title="房源描述" class="r_equipment">
				<div class="equipment mt-4">
					<div class="d-flex jc-around">
						<img :src="item.icon ? item.icon:require('../assets/images/photo/zanwu.png')"
						class="icon"
						@click="currentInfoIndex = i"
						:class="{active: currentInfoIndex === i}"
						v-for="(item, i) in rooms.informations"
						:key="item.i">
					</div>
					<div v-if="currentInfo" class="ml-2">
						<h4 class="r_name fs-xxl mb-0">[{{currentInfo.name}}]</h4>
						<p class="r_description fs-xl text-grey-1">{{currentInfo.description}}</p>
					</div>
				</div>
			</m-card>
			<!-- end of 房源描述 -->
			
			<m-card title="费用详情" class="cost">
				<h4 class="ml-1 mt-2 fs-xl">年租价 当租期不足一年时租金可能会上浮详情请咨询房东</h4>
				<div class="d-flex jc-between ml-1 mr-1 cost_body">
					<div class="flex-column">
						<p>付款方式</p>
						<p class="text-center">{{rooms.cost.m1}}</p>
					</div>
					<div class="flex-column">
						<p>租金(元/月)</p>
						<p class="text-Crimson text-center">{{rooms.monthly}}</p>
					</div>
					<div class="flex-column ai-center">
						<p>押金(元)<i class="iconfont icon-wenhao"></i></p>
						<p class="text-center">{{rooms.cost.m2}}</p>
					</div>
					<div class="flex-column ai-center">
						<p>服务费(元)<i class="iconfont icon-wenhao"></i></p>
						<p class="text-center">{{rooms.cost.m3}}</p>
					</div>
				</div>
			</m-card>
			<!-- end of 费用详情 -->
			
			<m-card title="联系方式" class="room_title">
				<div class="room_liaison mt-3 ml-2">
					联系人：<strong class="fs-iic">{{rooms.liaison}}</strong>
				</div>
				<div class="rooms_contact d-flex jc-around">
					<div class="rooms_tel mt-2">
						<span class="tel_1" v-show="!showContact" @click="showContact = !showContact">联系电话</span>
						<strong class="tel_2" v-show="showContact" @click="showContact = !showContact">{{rooms.telphone}}</strong>
					</div>
					<div class="rooms_border mt-2"></div>
					<div class="rooms_wechat mt-2">
						<span class="we_1" v-show="!showWechat" @click="showWechat = !showWechat">微信二维码</span>
						<span v-show="showWechat" @click="showWechat = !showWechat"><img :src="rooms.wechat"></span>
					</div>
				</div>
				
			</m-card>
		</div>
		
	</div>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		props: {
			id: { require: true }
		},
		data () {
			return {
				rooms: null,
				comments: {},
				currentInfoIndex: 0, 
				swiperOptions: {
				  pagination: {
						el: '.pagination-home'
					}
				},
				showContact: false,
				showWechat: false
			}
		},
		computed: {
			currentInfo() {
				return this.rooms.informations[this.currentInfoIndex]
			}
		},
		filters: {
		  date (val) {
				return dayjs(val).format('YYYY-MM-DD')
		  }
		},
		methods: {
			async fetch(){
				const res = await this.$http.get(`room/detail/${this.id}`)
				this.rooms = res.data
			},
			// async fetchComment(){
			// 	const res = await this.$http.get(`room/detail/${this.id}`)
			// 	this. comments = res.data
			// }
			iconBtn() {
				alert("该房子包含押金")
			}
		},
		created() {
			this.fetch()
			// this.fetchComment()
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/_variables.scss';
	i {
		font-size: 1.5rem;
	}
	// .room_header {
	// 	position: sticky;
	// 	top: 0px;
	// 	z-index: 100;
	// }
	.room_body {
		.room_body_header2 {
			.room_body_item{
				width: 100%;
				border-right: 1px solid map-get($colors, 'light-1');
				&:nth-child(4) {
					border-right: none;
				}
			}
		}
		.r_equipment {
			img.icon {
				width: 37px;
				height: 37px;
				border-radius: 50%;
				border: 1px solid map-get($colors, 'Honeydew');
			}
		}
		.equipment {
			img.icon {
				width: 40px;
				height: 40px;
				padding: 0.08rem;
				border-radius: 50%;
				border: 2px solid map-get($colors, 'white');
				&.active {
					border-color: map-get($colors, 'CornflowerBlue');
				}	
			}
		}
		.cost {
			.cost_body {
				margin-top: -1rem;
			}
		}
		.room_title {
			margin-top: -0.7rem;
			.rooms_contact {
				.rooms_border {
					border-right: 1px solid map-get($colors, 'Honeydew-2');
				}
			}
			.rooms_tel {
				width: 7rem;
				height: 5rem;
				position: relative;
				// border: 1px solid red;
				.tel_1 {
					position: absolute;
					top: 1.8rem;
					left: 1.5rem;
				}
				.tel_2 {
					position: absolute;
					top: 1.8rem;
				}
			}
			.rooms_wechat {
				width: 7rem;
				height: 5rem;
				position: relative;
				// border: 1px solid red;
				.we_1 {
					position: absolute;
					top: 1.8rem;
					left: 1rem;
				}
				img {
					width: 5rem;
					height: 5rem;
					margin-left: 1rem;
				}
			}
		}
		
	}
</style>
