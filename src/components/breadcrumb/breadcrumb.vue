<template> <!-- 面包屑导航组件-->
	<el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
		<!-- <transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in levelList" v-if="item.meta.title" :key="item.path" :index="index">
				
				<span v-if="item.redirect===&quot;noredirect&quot;||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
				<router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
				
			</el-breadcrumb-item>
		</transition-group> -->
			<transition-group name="breadcrumb">
				<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path" :to="item.path" :index="index">{{item.name}}
					<!-- <span v-if="index==levelList.length-1">{{item.name}}</span>
					<router-link v-else :to="item.path">{{item.name}}</router-link> -->
				</el-breadcrumb-item>
			</transition-group>
	</el-breadcrumb> 
</template>

<script>
	export default {
		data () {
			return {
				levelList: [],
				list: []
			}
		},
		watch: {
			$route () { //监听路由发生变化
				this.getBreadcrumb()
			}
		},
		created () {
			this.$router.push('/Drplan') // 刷新后进入此路由，created组件创建之后就调用
			this.getBreadcrumb()
		},
		methods: {
			getBreadcrumb () {
				this.levelList = this.$route.meta.routeList
				// console.log(this.$route.meta.routeList)
				/* let list = []
					console.log(this.$route)
					let matched = this.$route.matched.filter(item => item.name)
					const first = matched[0]
					// console.log(this.list)
					
					// this.list.push(this.$route)
					
					if (first && first.name.trim().toLocaleLowerCase() !== 'Drplan'.toLocaleLowerCase()) {
						// matched = [{path: '/Drplan', meta: {title: 'Drplan'}}].concat(matched)
						// 面包屑如果有默认首页导航的话，给matched手动添加默认项此处无默认首页导航
						matched = [].concat(matched)
					}
					// key, 回点slice
					
					// this.levelList = this.list
					this.levelList = matched
					console.log(this.levelList)
				 */
			},
			beforeRouteEnter (to, from, next) { // 或者使用 watch
				next(vm => {
					vm.levelList = to.meta.routeList
				})
			}
		}/* ,
		watch: { // 或者使用beforeRouteEnter
			$route (newV, oldV) {
				this.levelList = newV.meta.routeList
			}
		} */
	}
</script>
<style scoped>
	
</style>
