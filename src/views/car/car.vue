<template>
	<section>
		<el-scrollbar style="height: 100%;">
		<h3>Vuex 购物车 demo</h3>
		<!-- 商品的列表 -->
		<product />
		<!-- 购物车的列表 -->
		<Cart />
		<!-- 总数量价格 -->
		<info />
		</el-scrollbar>
	</section>
</template>

<script>
	import Product from '@/components/Product' // 商品的列表组件
	import Cart from '@/components/Cart' // 已选商品的组件
	import Info from '@/components/Info' // 总数量价格的组件
	
	export default {
		name: 'cart',
		components: { Product, Cart, Info }
	}
</script>
<style scoped>
	
</style>