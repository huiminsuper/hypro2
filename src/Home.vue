<template>
	<section>
		<!-- <el-menu mode="horizontal" :default-active="$router.path" router>
			<template v-for="(item, index) in $router.options.routes[0].children">
				<el-menu-item :index="item.path" :key="index" @click="handleSelect">{{item.name}}</el-menu-item>
			</template>
		</el-menu> -->
		<el-menu mode="horizontal" :default-active="$route.path" router>
			<template v-for="(item, index) in $router.options.routes[0].children">
				<el-menu-item :index="item.path" :key="index" @click="handleSelect">{{item.tabName}}</el-menu-item>
			</template>
		</el-menu>
		<transition name="fade-transform" mode="out-in">
		<router-view></router-view>
		</transition>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		computed: {
			/* activeIndex () {
				return this.$route.path
			} */
		},
		mounted () {
			// console.log(this.$router.options.routes[0].children)
		},
		methods: {
			handleSelect (key, keypath) {
				// console.log(key)
				// console.log(keypath)
			}
		}
	}
</script>

<style scoped>
	
</style>
