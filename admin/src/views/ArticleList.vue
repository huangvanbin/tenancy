<template>
	<div>
		<h1>文章列表</h1>
		<el-table :data="items.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450" style="width: 100%">
			<el-table-column prop="_id" label="ID" width="240"></el-table-column>
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column prop="username" label="作者"></el-table-column>
			<el-table-column prop="icon" label="头像">
			  <template slot-scope="scope">
			    <img :src="scope.row.userimg" style="height:1rem">
			  </template>
			</el-table-column>
			
			<el-table-column label="操作" fixed="right" width="180">
			  <template slot-scope="scope">
			    <el-button size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
			    <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
			  </template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[5, 10, 20, 40]" 
			:page-size="pagesize"         
			layout="total, sizes, prev, pager, next, jumper"
			:total="items.length">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				currentPage:1, //初始页
				pagesize:5,    //    每页的数据
				select:''
			}
		},
		methods: {
			async fetch() {
				const res = await this.$http.get('rest/articles')
				this.items = res.data
			},
			async remove(row){
				this.$confirm(`是否确定要删除"${row.username}"的文章`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				await this.$http.delete(`rest/articles/${row._id}`)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				this.fetch() 
			});
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

<style>
	
</style>