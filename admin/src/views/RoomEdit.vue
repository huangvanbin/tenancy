<template>
	<div class="about">
		<h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}房屋</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-tabs type="border-card" value="basic">
				<!-- 第一个 -->
				<el-tab-pane label="房屋信息" name="basic">
					<el-form-item label="房屋名称">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					<el-form-item label="房屋类型">
						<el-select v-model="model.categories" multiple>
							<el-option v-for="item of categories" 
							:key="item._id"
							:label="item.name" 
							:value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋图展示">
					 <el-col :span="4">
					    <el-carousel type="card" height="80px">
								<el-carousel-item v-for="(item, i) in model.images" :key="item.i">
									<img v-if="item.img" :src="item.img" class="avatar">
								</el-carousel-item>
					    </el-carousel>
					 </el-col>
					</el-form-item>
					<el-form-item label="上传房屋图" >
						<el-upload
							:action="uploadUrl"
							:headers="getAuthHeaders()"
							:file-list="model.images.img"
							list-type="picture-card"
							:on-remove="handleRemove"
							:on-success="afterUpload">
							<img v-if="model.images.img" :src="model.images.img" class="avatarL">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
						
					<el-form-item label="房屋热度">
						<el-rate style="margin-top: 0.6rem;" :max="10" show-score v-model="model.hots"></el-rate>
					</el-form-item>
					
					<el-form-item label="租金">
						<el-col :span="2">
							<el-input v-model="model.monthly"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="面积">
						<el-col :span="2">
							<el-input v-model="model.area"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="楼层">
						<el-col :span="2">
							<el-input v-model="model.floor"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="房屋基本信息">
						<el-select v-model="model.equipment1" multiple>
							<el-option v-for="item of equipments" 
							:key="item._id"
							:label="item.name" 
							:value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋设备信息">
						<el-select v-model="model.equipment2" multiple>
							<el-option v-for="item of equipments" 
							:key="item._id"
							:label="item.name" 
							:value="item._id"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="入住小提示">
						<el-input type="textarea" v-model="model.liveTips"></el-input>
					</el-form-item>

				</el-tab-pane>
				
				<!-- 第二个 -->
				<el-tab-pane label="房屋描述" name="informations">
					<el-button type="info" round @click="model.informations.push({})">
						<i class="el-icon-plus">添加描述</i>
					</el-button>
					<el-row type="flex" style="flex-wrap: wrap;">
						<el-col :md="12" v-for="(item, i) in model.informations" :key="item.i">
							<el-form-item label="图标">
								<el-upload
								  class="avatar-uploader"
								  :action="uploadUrl"
								  :headers="getAuthHeaders()"
								  :show-file-list="false"
								  :on-success="res => $set(item, 'icon', res.url)">
								  <img v-if="item.icon" :src="item.icon" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input type="textarea" v-model="item.description"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="danger" 
								@click="model.informations.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<!-- 第三个 -->
				<el-tab-pane label="费用详情">
					<el-form-item label="付款方式">
						<el-col :span="2">
							<el-input v-model="model.cost.m1"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="租金">
						<el-col :span="2">
							<el-input v-model="model.monthly"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="押金">
						<el-col :span="2">
							<el-input v-model="model.cost.m2"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="服务费">
						<el-col :span="2">
							<el-input v-model="model.cost.m3"></el-input>
						</el-col>
					</el-form-item>
				</el-tab-pane>
				<!-- 第四个 -->
				<el-tab-pane label="联系房东">
					<el-form-item label="联系人">
						<el-col :span="3">
							<el-input v-model="model.liaison"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-col :span="3">
							<el-input v-model="model.telphone"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="联系微信">
						<el-upload
						  class="avatar-uploader"
						  :action="uploadUrl"
						  :headers="getAuthHeaders()"
						  :show-file-list="false"
						  :on-success="res => $set(model, 'wechat', res.url)">
						  <img v-if="model.wechat" :src="model.wechat" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-tab-pane>
				
			</el-tabs>
			
			<el-form-item style="margin-top: 2rem; margin-left: -2rem;">
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {
			id: {}
		},
		data() {
			return {
				fileList: [],
				categories: '',
				equipments: [],
				model: {
					name: '',
					// categories: '',
					images: [],
					informations: [],
					liveTips: '',
					cost: {},
					hots: 0,
					liaison: '',
					telphone: '',
					wechat: '',
					describes: {
						// monthly: 0,
						// area: 0,
						// floor: 0
					}
				},
			}
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			afterUpload(res) {
				// console.log(res)
				// this.model.images.img = res.url
				this.model.images.push({ img: res.url })
			},
			async save() {
				let res; // eslint-disable-line no-unused-vars
				if (this.id) {
				 res = await this.$http.put(`rest/rooms/${this.id}`,this.model)
				} else {
					res = await this.$http.post('rest/rooms',this.model);
				}
				this.$router.push('/rooms/list')
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() {
			  const res = await this.$http.get(`rest/rooms/${this.id}`);
			  this.model = Object.assign({}, this.model, res.data);
			},
			async fetchCategories() {
			  const res = await this.$http.get(`rest/categories`)
				this.categories = res.data
			},
			async fetchEquipments() {
			  const res = await this.$http.get(`rest/equipments`)
				this.equipments = res.data
			}
		},
		created(){
			this.fetchCategories()
			this.fetchEquipments()
			this.id && this.fetch()
		}
	}
</script>

<style>
</style>
