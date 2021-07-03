<template>
	<el-container style="height: 100vh; border: 1px solid #eee">
	  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
	    <el-menu router :default-openeds="['5']" :default-active="$route.path">
	      <el-submenu index="1">
	        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
	        <el-menu-item-group>
	          <template slot="title">房屋</template>
	          <el-menu-item index="/categories/create">房屋分类</el-menu-item>
	          <el-menu-item index="/categories/list">分类列表</el-menu-item>
	        </el-menu-item-group>
					
					<el-menu-item-group>
					  <template slot="title">房屋设备</template>
					  <el-menu-item index="/equipments/create">设备分类</el-menu-item>
					  <el-menu-item index="/equipments/list">设备列表</el-menu-item>
					</el-menu-item-group>
	      </el-submenu>
				
	      <el-submenu index="2">
	        <template slot="title"><i class="el-icon-message"></i>房屋管理</template>
	        <el-menu-item-group>
	          <template slot="title">分类</template>
	          <el-menu-item index="/rooms/create">新增房屋</el-menu-item>
	          <el-menu-item index="/rooms/list">房屋列表</el-menu-item>
	        </el-menu-item-group>
	      </el-submenu>
				
	      <el-submenu index="3">
	        <template slot="title"><i class="el-icon-s-comment"></i>评论管理</template>
	        <el-menu-item-group>
	          <template slot="title">评论</template>
	          <el-menu-item index="/comments/create">新建评论</el-menu-item>
	          <el-menu-item index="/comments/list">评论列表</el-menu-item>
	        </el-menu-item-group>
	      </el-submenu> 
				
				<el-submenu index="4">
				  <template slot="title"><i class="el-icon-s-flag"></i>社区管理</template>
				  <el-menu-item-group>
						<el-menu-item index="/articles/create">新建文章</el-menu-item>
				    <el-menu-item index="/articles/list">文章列表</el-menu-item>
				  </el-menu-item-group>
				</el-submenu>
				
				<el-submenu index="">
				  <template slot="title"><i class="el-icon-s-tools"></i>系统管理</template>
				  <el-menu-item-group title="广告位">
						<el-menu-item index="/ads/create">新建广告</el-menu-item>
				    <el-menu-item index="/ads/list">广告列表</el-menu-item>
				  </el-menu-item-group>
					<el-menu-item-group title="管理员">
						<el-menu-item index="/admins/create">新增管理员</el-menu-item>
					  <el-menu-item index="/admins/list">管理员列表</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="用户">
					  <el-menu-item index="/users/list">用户列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
	    </el-menu>
	  </el-aside>
	  
	  <el-container>
	    <el-header style="text-align: right; font-size: 1rem;">
	      <el-dropdown>
	        <i class="el-icon-setting" style="margin-right: 15px"></i>
	        <el-dropdown-menu slot="dropdown">
	          <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
	        </el-dropdown-menu>
	      </el-dropdown>
	      <span>房屋租赁网站后台管理系统</span>
	    </el-header>
	    
	    <el-main>
	      <router-view :key="$route.path"></router-view>
	    </el-main>
	  </el-container>
	</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
		methods: {
			exit () {
				// 退出功能
				this.$confirm('确定要退出登录吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '退出成功!'
					});
					localStorage.clear() //确定退出，清除token
					this.$router.push('/login')
				}) .catch(() => {
					this.$message({
						type: 'info',
						message: '已取消退出'
					});
				});
			}
		}
  };
</script>
