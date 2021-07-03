<template>
	<div class="article_main">
		<div class="art_title d-flex jc-between bg-whiteSmoke">
			<img src="../assets/images/btn/huitui.png" class="mt-4 ml-3 art_hidden">
			<h2 class="fs-28">每日热帖</h2>
			<router-link tag="div" :to="`/article/post`">
				<img src="../assets/images/btn/fatie.png" class="mt-4 mr-3">
			</router-link>
		</div>
		<!-- end of header -->
		<div class="art_list">
			<router-link tag='div' 
			v-for="item in atcs.slice((currentPage-1)*pagesize, currentPage*pagesize)" :key="item._id"
			:to="`/article/detail/${item._id}`"
			class="article_item border-bottom ml-1 pt-1 pb-2">
				<div class="art_banner">
					<img :src="item.banner">
				</div>
				<div class="d-flex jc-between">
					<strong class="pl-2 mt-4 fs-ic">【{{item.title}}】</strong>
					<p class="pr-3 fs-xl">{{item.username}}</p>
				</div>
			</router-link>
			<!-- end of router-link -->
			<el-pagination
				class="page mt-1 mb-1"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pagesize"         
				layout="total, sizes, prev, next, jumper"
				:total="atcs.length">    //这是显示总共有多少数据，
			</el-pagination>
			<!-- end of page -->
		</div>
		<div class="art_footer">
			<img src="../assets/images/img/white.png" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				atcs: [],
				currentPage: 1, // 初始页
				pagesize: 10,    // 每页的数据
				current: '',
			}
		},
		methods: {
			async fetch() {
			  const res = await this.$http.get('article/list');
			  this.atcs = res.data
			},
			// 初始页currentPage、初始每页数据数pagesize和数据data
			handleSizeChange: function (size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage){
				this.currentPage = currentPage;
			},
		},
		created() {
			this.fetch()
		}
	}
</script>

<style lang="scss">
	.article_main {
		position: relative;
		.art_title {
			.art_hidden {
				visibility: hidden;
			}
		}
		.art_list {
			position: relative;
			.article_item {
				width: 98vw;
				// box-shadow: 2px 2px 4px #f1f1f1;
				.art_banner img {
					width: 100%;
					height: auto;
				}
			}
			.page {
				.el-pagination__jump {
					margin-left: 10px;
				}
			}
		}
		.art_footer img {
			width: 100%;
			height: 5rem;
			visibility: hidden;
		}
	}
	
</style>
