<template>
	<div class="room_publish bg-white">
		<div class="room_header d-flex jc-between bg-whiteSmoke">
			<router-link tag="div" :to="`/room/list`">
				<img src="../assets/images/btn/quxiao.png" class="mt-4 ml-3">
			</router-link>
			<h2 class="fs-28">发布房屋</h2>
			<router-link tag="div" :to="`/home`">
				<img src="../assets/images/btn/queding.png" class="mt-4 mr-3" @click="onSubmit()">
			</router-link>
		</div>
		<!-- end of header -->
		<div class="pic_public d-flex flex-wrap border-bottom">
			<el-upload
				:action="$http.defaults.baseURL+'/upload'"
				:file-list="model.images.img"
				list-type="picture-card"
				:on-remove="handleRemove"
				:on-success="res => this.model.images.push({img:res.url})">
				<span class="fs-md">上传房屋图片</span>
			</el-upload>
		</div>
		<!-- end of upload -->
		<div class="room_main">
			<div class="room_input mt-3 border-bottom pb-2">
				<span class="fs-lg">房屋</span>
				<input class="p-2 bg-white fs-ic" v-model="model.name" placeholder="填写房屋名字"/>
			</div>
			<!-- end of name -->
			<div class="room_describe mt-2 d-flex text-center border-bottom">
				<div class="room_area pr-4 mt-2">
					<span class="pl-3 fs-lg"><i class="iconfont icon-fangwumianji"></i>面积</span>
					<input class="bg-white fs-ic mt-1 ml-2 text-center" v-model="model.area" placeholder="请填写m²"/>
				</div>
				<div class="room_floor pr-4 mt-2">
					<span class="pl-3 fs-lg"><i class="iconfont icon-louceng"></i>楼层</span>
					<input class="bg-white fs-ic mt-1 ml-2 text-center" v-model="model.floor" placeholder="填写楼层">
				</div>
			</div>
			<!-- end of descript -->
			<m-card title_1="房屋信息" class="border-bottom">
				<div class="room_category mt-4 mb-4 pr-2 text-center">
					<i class="iconfont icon-17 mt-1"></i>
					 房屋类型：
					<el-select v-model="model.categories" multiple>
						<el-option v-for="item of cates" 
						:key="item._id"
						:label="item.name" 
						:value="item._id"></el-option>
					</el-select>
				</div>
				<div class="room_equip1 mt-4 mb-4 pr-2 text-center">
					<i class="iconfont icon-jibenxinxi mt-1"></i>
					 基本信息：
					<el-select v-model="model.equipment1" multiple>
						<el-option v-for="item of eqs" 
						:key="item._id"
						:label="item.name" 
						:value="item._id"></el-option>
					</el-select>
				</div>
				<div class="room_equip2 mt-4 pr-2 text-center">
					<i class="iconfont icon-shebei mt-1"></i>
					 设备信息：
					<el-select v-model="model.equipment2" multiple>
						<el-option v-for="item of eqs" 
						:key="item._id"
						:label="item.name" 
						:value="item._id"></el-option>
					</el-select>
				</div>
			</m-card>
			<!-- end of equipment -->
			<m-card title_1="费用详情" class="border-bottom">
				<div class="room_cost mt-2 d-flex text-center border-bottom">
					<div class="room_m1 pr-4 mt-2">
						<span class="fs-lg"><i class="iconfont icon-fangwumianji"></i>方式</span>
						<input class="bj-white fs-ic mt-1 ml-2 text-center" v-model="model.cost.m1" placeholder="如:月付"/>
					</div>
					<div class="room_m1 pr-4 mt-2">
						<span class="fs-lg"><i class="iconfont icon-louceng"></i>租金</span>
						<input class="bj-white fs-ic mt-1 ml-2 text-center" v-model="model.monthly" placeholder="填写金额">
					</div>
					<div class="room_m1 pr-4 mt-2">
						<span class="fs-lg"><i class="iconfont icon-fangwumianji"></i>押金</span>
						<input class="bj-white fs-ic mt-1 ml-2 text-center" v-model="model.cost.m2" placeholder="填写金额"/>
					</div>
					<div class="room_m1 pr-4 mt-2">
						<span class="fs-lg"><i class="iconfont icon-louceng"></i>服务费</span>
						<input class="bj-white fs-ic mt-1 ml-2 text-center" v-model="model.cost.m3" placeholder="填写金额">
					</div>
				</div>
			</m-card>
			<!-- end of price -->
			<m-card title_1="联系方式" class="border-bottom">
				<div class="room_contact text-center">
					<div class="room_liaison mt-3 pb-2">
						<span class="fs-lg pl-3 pr-4">联系人</span>
						<input class="bg-white fs-ic text-center" v-model="model.liaison" placeholder="填写房屋名字"/>
					</div>
					<div class="room_liaison mt-3 pb-2">
						<span class="fs-lg pl-3 pr-4">联系电话</span>
						<input class="bg-white fs-ic text-center" v-model="model.telphone" placeholder="填写联系电话"/>
					</div>
					<div class="room_wechat d-flex jc-between border-bottom pb-1">
						<span class="title">微信二维码</span>
						<el-upload
							class="avatar-uploader"
							:action="$http.defaults.baseURL+'/upload'"
							:show-file-list="false"
							:on-success="res => this.$set(this.model, 'wechat', res.url)">
							<img v-if="model.wechat" :src="model.wechat" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</div>
			</m-card>
			<!-- end of contact -->
			<m-card title_1="房源描述">
				<div class="room_btn m-2">
					<div v-for="(i, index) in model.informations" :key="i._id" class="pb-2">
						<el-input v-model="i.name" placeholder="填写如: 交通出行" class="pb-1"></el-input>
						<el-input type="textarea" v-model="i.description" placeholder="添加详细描述" class="pb-1"></el-input>
					</div>
					<el-button type="primary" size="mini" round @click="model.informations.push({})">添加描述</el-button>
				</div>
			</m-card>
			
		</div>
		<!-- end of main -->
		<div class="room_footer pt-3">
			<img src="../assets/images/img/white.png" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				model: {
					name: '',
					images: [],
					cost: {},
					liaison: '',
					telphone: '',
					wechat: '',
					informations: []
				},
				cates: [],
				eqs: [],
			}
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			async onSubmit () {
				const res = await this.$http.post('/roompublish', this.model);
				// this.$router.push('/home')
			},
			async fetchCategories(){
			  const res = await this.$http.get(`category/`);
			  this.cates = res.data
			},
			async fetchEquipments(){
			  const res = await this.$http.get(`equipment/`);
			  this.eqs = res.data
			}
		},
		created () {
			this.fetchCategories()
			this.fetchEquipments()
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/_variables.scss';
	.room_publish {
		.room_main {
			.room_input {
				text-align: center;
				input {
					width: 100%;
					height: 3rem;
					line-height: 3rem;
					text-align: center;
				}
			}
			// room_describe
			.room_describe {
				.room_area {
					margin-bottom: 0.9rem;
					border-right: 1px solid map-get($colors, 'Honeydew-2');
				}
				input {
					width: 100%;
				}
			}
			// room_category
			.room_category {
				select {
					width: 15rem;
					height: 3rem;
					border-radius: 2rem;
					border: none;
				}
			}
			// room_equip1
			.room_equip1 {
				select {
					width: 15rem;
					height: 3rem;
					border-radius: 2rem;
					border: none;
				}
			}
			// room_equip2
			.room_equip2 {
				select {
					width: 15rem;
					height: 3rem;
					border-radius: 2rem;
					border: none;
				}
			}
			// room_cost
			.room_cost {
				.room_m1 {
					margin-bottom: 0.9rem;
					border-right: 1px solid map-get($colors, 'Honeydew-2');
					&:nth-child(4) {
						border-right: none;
					}
				}
				input {
					width: 100%;
				}
			}
			// room_contact
			.room_contact {
				.room_liaison {
					input {
						border-radius: 0px;
						border-bottom: 1px solid map-get($colors, 'Honeydew-2');
					}
				}
				.room_wechat {
					.title {
						padding-top: 2rem;
						padding-left: 1.1rem;
					}
					.avatar-uploader {
						padding-right: 9rem;
					}
					.avatar-uploader .el-upload {
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
					}
					.avatar-uploader .el-upload:hover {
						border-color: #409EFF;
					}
					.avatar-uploader-icon {
						font-size: 12px;
						color: #8c939d;
						width: 5rem;
						height: 5rem;
						line-height: 5rem;
						text-align: center;
					}
					.avatar {
						width: 5rem;
						height: 5rem;
						display: block;
					}
				}
			}
			// 
		}
	}
</style>
