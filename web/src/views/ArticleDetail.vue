<template>
	<div class="bg-snow">
		<div class="d-flex jc-between bg-whiteSmoke">
			<router-link tag="div" :to="`/community`">
				<img src="../assets/images/btn/huitui.png" class="mt-4 ml-3">
			</router-link>
			<h2 class="fs-28">文章详情</h2>
			<router-link tag="div" :to="`/`">
				<img src="../assets/images/btn/jiasu.png" class="mt-4 mr-3" style="visibility: hidden;">
			</router-link>
		</div>
		<!-- end of header -->
		<div class="articla_banner">
			<img :src="atcsd.banner" alt="">
		</div>
		<!-- end of  banner -->
		<div class="article_body w-100 pt-2 bg-white">
			<h3 class="fs-ie mt-2 ml-3">{{atcsd.title}}</h3>
			<div class="d-flex ai-center ml-3 mr-3 border-bottom">
				<img :src="atcsd.userimg ? atcsd.userimg:require('../assets/images/photo/touxiang.png')" class="ml-3">
				<div class="ml-4 mt-2 flex-colum">
					<strong class="fs-xxl">{{atcsd.username}}</strong>
					<p class="text-grey-1">{{atcsd.createdAt | date}}</p>
				</div>
			</div>
			</div>
			<div v-html="atcsd.body" class="ml-1 mr-1 art-body-img">
		</div>
		<!-- end of articledetail -->
		
		
		<el-backtop></el-backtop>
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
				atcsd: {},
			}
		},
		filters: {
		  date (val) {
		      return dayjs(val).format('YYYY-MM-DD')
		  }
		},
		methods: {
			async fetch(){
				const res = await this.$http.get(`article/detail/${this.id}`)
				this. atcsd = res.data
			}
		},
		created() {
			this.fetch()
		}
	}
</script>

<style lang="scss">
	i {
		font-size: 1.5rem;
	}
	.articla_banner {
		width: 98vw;
		margin-left: 0.25rem;
		img {
			width: 100%;
		}
	}
	.article_body {
		img {
			max-width: 16%;
			border-radius: 30px;
		}
	}
	.art-body-img {
		img {
			width: 100vw;
			height: auto;
		}
	}
	.el-backtop {
		background-color: rgba(255,255,255,0.1) !important;
	}
</style>
