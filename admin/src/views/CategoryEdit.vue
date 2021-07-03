<template>
	<div class="about">
		<h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}房屋分类</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="房屋分类">
				<el-select v-model="model.parent">
					<el-option v-for="item in parents" 
					:key="item._id" 
					:label="item.name" 
					:value="item._id"></el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item label="房屋名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			
<!-- 			<el-form-item label="房屋图标">
				<el-upload
				  class="avatar-uploader"
				  :action="$http.defaults.baseURL + '/upload'"
					:headers="getAuthHeaders()"
				  :show-file-list="false"
				  :on-success="afterUpload">
				  <img v-if="model.icon" :src="model.icon" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item> -->
			
			<el-form-item>
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
				model: {},
				parents: []
			}
		},
		methods: {
			// afterUpload(res) {
			// 	console.log(res)
			// 	// this.model.icon = res.url
			// 	this.$set(this.model, 'icon', res.url)
			// },
			async save() {
				let res; // eslint-disable-line no-unused-vars
				if (this.id) {
				 res = await this.$http.put(`rest/categories/${this.id}`, this.model)
				} else {
					res = await this.$http.post('rest/categories', this.model);
				}
				this.$router.push('/categories/list')
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch(){
			   const res = await this.$http.get(`rest/categories/${this.id}`)
			   this.model = res.data
			},
			async fetchParents() {
			  const res = await this.$http.get(`rest/categories`)
			//   var newArr = res.data.filter(function (item) {
			// 	if (!item.parent) {
			// 	 return item;  
			// 	}
			// })
			// this.parents = newArr
				this.parents = res.data
			}
		},
		created(){
			this.fetchParents()
			this.id && this.fetch()
		}
	}
</script>

<style>
</style>
