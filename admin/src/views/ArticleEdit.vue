<template>
	<div class="about">
		<h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}文章</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="标题">
				<el-input v-model="model.title"></el-input>
			</el-form-item>
			<el-form-item label="作者">
				<el-input v-model="model.username"></el-input>
			</el-form-item>
			<el-form-item label="头像">
				<el-upload
				  class="avatar-uploader"
				  :action="uploadUrl"
					:headers="getAuthHeaders()"
				  :show-file-list="false"
				  :on-success="res => this.$set(this.model, 'userimg', res.url)">
				  <img v-if="model.userimg" :src="model.userimg" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="封面图">
				<el-upload
				  class="avatar-uploader"
				  :action="uploadUrl"
					:headers="getAuthHeaders()"
				  :show-file-list="false"
				  :on-success="res => this.$set(this.model, 'banner', res.url)">
				  <img v-if="model.banner" :src="model.banner" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="详情">
				<vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { VueEditor } from "vue2-editor"
	
	export default {
		props: {
			id: {}
		},
		components: {
		  VueEditor
		},
		data() {
			return {
				model: {},
			}
		},
		methods: {
			// afterUpload(res) {
			// 	console.log(res)
			// 	// this.model.icon = res.url
			// 	this.$set(this.model, 'banner', res.url)
			// },
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			 const formData = new FormData();
			 formData.append("file", file);
			 const res= await this.$http.post('upload', formData);
			 Editor.insertEmbed(cursorLocation, "image", res.data.url);
			 resetUploader();
			},
			async save() {
				let res; // eslint-disable-line no-unused-vars
				if (this.id) {
				 res = await this.$http.put(`rest/articles/${this.id}`, this.model)
				} else {
					res = await this.$http.post('rest/articles', this.model);
				}
				this.$router.push('/articles/list')
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch(){
			   const res = await this.$http.get(`rest/articles/${this.id}`)
			   this.model = res.data
			}
		},
		created(){
			this.id && this.fetch()
		}
	}
</script>

<style>
</style>
