<template>
	<div class="article_post">
		<div class="ap_header d-flex jc-between bg-whiteSmoke">
			<router-link tag="div" :to="`/community`">
				<img src="../assets/images/btn/quxiao.png" class="mt-4 ml-3 art_hidden">
			</router-link>
			<h2 class="fs-28">编辑文章</h2>
			<router-link tag="div" :to="`/`">
				<img src="../assets/images/btn/jiasu.png" class="mt-4 mr-3" @click="onSubmit()">
			</router-link>
		</div>
		<!-- end of header -->
		<div class="bg-white ap_main">
			<div class="ap_username border-bottom pt-4 pb-2 text-center">
				<span class="fs-xl ml-5">文章作者</span>
				<input class="bg-white fs-28 text-center" :value="arptb.username" readonly="readonly"/>
			</div>
			<div class="ap_pic border-bottom pt-2 pb-2 text-center">
				<span class="fs-ic">用户头像</span>
				<el-upload
					class="avatar-uploader pt-2"
					:action="$http.defaults.baseURL+'/upload'"
					:show-file-list="false"
					:on-success="res => this.$set(this.arptb, 'userimg', res.url)">
					<img v-if="arptb.userimg" :src="arptb.userimg" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
			<div class="ap_title mt-3 border-bottom pb-2">
				<span class="fs-lg">文章标题</span>
				<input class="p-2 bg-white fs-ic" v-model="arptb.title" placeholder="填写文章标题"/>
			</div>
			<div class="ap_cover text-center pb-2">
				<el-upload
					class="avatar-uploader pt-2"
					:action="$http.defaults.baseURL+'/upload'"
					:show-file-list="false"
					:on-success="res => this.$set(this.arptb, 'banner', res.url)">
					<img v-if="arptb.banner" :src="arptb.banner" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon">添加封面</i>
				</el-upload>
			</div>
			<div class="ap_aditor">
				<vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="arptb.body"></vue-editor>
			</div>
		</div>
	</div>
</template>

<script>
	import { VueEditor } from "vue2-editor"
	export default {
		data () {
			return {
				arptb: {
					username: '',
					userimg: '',
					title: '',
					banner: '',
					body: ''
				}
			}
		},
		components: {
			VueEditor
		},
		methods: {
			fetchUser () {
				this.arptb.username = localStorage.getItem('username')
			},
			async onSubmit () {
				const res = await this.$http.post('/articlepublish', this.arptb);
				this.$router.push('/community')
			},
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			 const formData = new FormData();
			 formData.append("file", file);
			 const res= await this.$http.post('upload',formData);
			 Editor.insertEmbed(cursorLocation, "image", res.data.url);
			 resetUploader();
			},
		},
		created() {
			this.fetchUser()
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/_variables.scss';
	.article_post {
		.ap_main {
			.ap_username {
				.ap_border {
					border-right: 1px solid map-get($colors, 'Honeydew-2');
				}
			}
			.ap_pic {
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
					width: 6rem;
					height: 6rem;
					line-height: 6rem;
					text-align: center;
				}
				.avatar {
					width: 6rem;
					height: 6rem;
					display: block;
				}
			}
			.ap_title {
				text-align: center;
				input {
					width: 100%;
					height: 3rem;
					line-height: 3rem;
					text-align: center;
				}
			}
			.ap_cover {
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
					width: 15rem;
					height: 10rem;
					line-height: 10rem;
					text-align: center;
				}
				.avatar {
					width: 15rem;
					height: 10rem;
					display: block;
				}
			}
			.ap_aditor {
				.ql-toolbar.ql-snow {
					padding: 0;
					.ql-formats {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
