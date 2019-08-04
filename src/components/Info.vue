<!-- Info 组件（纯净态 code） -->
<template>
	<section>
		<div class="item-wrapper">
			<div class="item">总数：
				<strong>{{totalNum}}</strong>
			</div>
			<div class="item">总价：
				<strong>{{totalPrice}}</strong>
			</div>
			<el-button @click="clearAllCart" type="danger" class="item">清空购物车</el-button>
		</div>
	</section>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		name: "info",
		data () {
			return {}
		},
		computed: {
			...mapGetters(['totalPrice','totalNum'])
		},
		methods: {
			...mapActions(['clearAllCart'])
		}
	}
</script>

<style scoped>
	.item-wrapper {
		display: flex;
		background-color: #dfdfdf;
		align-items: center;
		justify-content: center;
	}
	
	.item {
		flex: 1;
	}
</style>