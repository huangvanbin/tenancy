<template>
	<div class="about">
		<h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}文章评论</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="文章名称">
				<el-select v-model="model.acticlenames" style="width: 400px;">
					<el-option v-for="item of articles" 
					:key="item._id"
					:label="item.title" 
					:value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="评论用户名称">
				<el-input v-model="model.username"></el-input>
			</el-form-item>
			<el-form-item label="用户头像">
				<el-upload
				  class="avatar-uploader"
				  :action="uploadUrl"
					:headers="getAuthHeaders()"
				  :show-file-list="false"
				  :on-success="afterUpload">
				  <img v-if="model.usericon" :src="model.usericon" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="评论内容">
				<vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
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
				rooms: [],
				articles: []
			}
		},
		methods: {
			afterUpload(res) {
				console.log(res)
				// this.model.icon = res.url
				this.$set(this.model, 'usericon', res.url)
			},
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			 const formData = new FormData();
			 formData.append("file", file);
			 const res= await this.$http.post('upload',formData);
			 Editor.insertEmbed(cursorLocation, "image", res.data.url);
			 resetUploader();
			},
			async save() {
				let res; // eslint-disable-line no-unused-vars
				if (this.id) {
				 res = await this.$http.put(`rest/comments/${this.id}`,this.model)
				} else {
					res = await this.$http.post('rest/comments',this.model);
				}
				this.$router.push('/comments/list')
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch(){
			   const res = await this.$http.get(`rest/comments/${this.id}`)
			   this.model = res.data
			},
			async fetchArticles() {
			  const res = await this.$http.get(`rest/articles`)
				this.articles = res.data
			},
		},
		created(){
			this.fetchArticles()
			this.id && this.fetch()
		}
	}
</script>

<style>
</style>
