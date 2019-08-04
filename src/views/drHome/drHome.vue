<template>
	<section class="section-padding-top top2">
		<div style="text-align: left;padding-left: 20px;">
			<el-col :span="24" class="search-div">
				<Breadcrumb class="breadcrumb-container"></Breadcrumb>
			</el-col>
		</div>
		<transition name="fade-transform" mode="out-in">
			<router-view></router-view>
		</transition>
	</section>
</template>

<script>
	import Breadcrumb from '@/components/breadcrumb/breadcrumb'
	export default {
		data () {
			return {}
		},
		components: {
			Breadcrumb
		}/* ,
		computed: {
			key () {
				return this.$route.fullPath
			}
		} */
	}
</script>

<style scoped>
	
</style>
