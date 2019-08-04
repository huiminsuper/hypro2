<!-- Cart 组件（纯净态 code） -->
<template>
	<section>
		<h4>已选商品</h4>
		 <el-table :data="carProducts" v-loading="listLoading" empty-text="购物车空空如也...">
			<el-table-column label="ID" prop="id" align="center" />
			<el-table-column label="名称" prop="name" align="center" />
			<el-table-column label="价格" prop="price" align="center" />
			<el-table-column label="数量" prop="num" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button @click="deleteItem(scope.row)" type='danger' size="mini" icon="el-icon-error"></el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>
<script>
	import { mapGetters, mapActions } from'vuex'
	
	 export default {
		name: "cart",
		data () {
			return {
				listLoading: false
			}
		},
		mounted () {
			
		},
		computed: {
			...mapGetters(['carProducts'])
		},
		methods: {
			// ...mapActions(['deleteItem'])
			deleteItem (row) {
				this.$store.dispatch('deleteItem', row);
			}
		}
	}
</script>

