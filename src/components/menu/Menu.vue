<template>
	<section>
		<div>this is Menu</div>
		<template v-for="list in this.menuList" :key="list.resourceId">
			<el-submenu index="1" v-if="list.chilren.length>0" :index="list.resourceId" :index="list.resourceName">
				<template slot="title" style="padding-left: 10px;">
					<i class="el-icon-menu"></i>
					<span slot="title">{{list.resourceName}}</span>
				</template>
				<Menu :menuList="list.children"></Menu>
			</el-submenu>
			<el-menu-item v-else :index="list.resourceName" :key="list.resourceId" style="padding-left: 50px;" @click="changeRoute(list.resourceName)"></el-menu-item>
			<span>{{list.resourceName}}</span>
		</template>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		props: ['']
	}
</script>

<style scoped>
	
</style>
