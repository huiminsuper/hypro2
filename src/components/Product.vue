<!-- Product 组件（纯净态 code） -->
<template>
	<section class="product">
		
			<h4>商品信息</h4>
			<el-table :data="shoplist" v-loading="listLoading">
				<el-table-column label="ID" prop="id" align="center" />
				<el-table-column label="名称" prop="price" align="center" />
				<el-table-column label="价格" prop="name" align="center" />
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-tooltip placement="right" content="加入购物车">
							<el-button @click="addToCart(scope.row)" type="primary" size="mini" icon="el-icon-circle-plus"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
	</section>
</template>

<script>
	import { mapGetters, mapActions } from'vuex'
	
	export default {
		name: "product",
		data () {
			return {
				listLoading: false
			}
		},
		// 在组件中拿到 state 中的 shoplist 数据
		// 第一种方法：vuex 和组件中使用的 shoplist 的名称
		computed: {
			...mapGetters(['shoplist']) // 这是数组 ['A', 'B', 'C', ...]
		},
		
		methods: {
			// 第二种写法：vuex 中抛出的 shoplist ， 但是我们组件实际用的是shoplistData, 实际就是换个名字
// 			...mapGetter({
// 				shoplistData: 'shoplist' // 这是对象
// 			})
			...mapActions(['addToCart'])
		}
	}
</script>
