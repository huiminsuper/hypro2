<template>
	<section class="section-padding-top">
		<el-col :span="24" class="search-div">
			<el-form  :inline="true" :model="formInline" class="sel-form">
				<el-form-item>
					<el-select v-model="formInline.sel1" placeholder="选择1" @change="conditionChange">
						<el-option 
							v-for="item in list1"
							:key="item.id"
							:label="item.name"
							:value="item.name"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="formInline.sel2" placeholder="选择2"  @change="conditionChange">
						<el-option 
							v-for="item in list2"
							:key="item.id"
							:label="item.name"
							:value="item.name"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="data2" v-loading='listLoading'>
			<el-table-column prop="id" label="ID" align="center" />
			<el-table-column prop="name" label="卫星号" align="center" />
			<el-table-column prop="label" label="载荷级别" align="center" />
		</el-table>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				listLoading: false,
				formInline: {
					name: '',
					sel1: '',
					sel2: ''
				},
				list1: [
					{id: 1, name: 'H1C'},
					{id: 2, name: 'H1B'}
				], 
				list2: [
					{id: 1, name: 'L1A'},
					{id: 2, name: 'L1B'},
					{id: 3, name: 'L1C'},
					{id: 4, name: 'L2A'}
				],
				data2: [],
				data: [] // 元数据
			}
		},
		methods: {
			conditionChange () {
				this.data2 = []
				this.data.forEach((item, index, array) => {
					if (this.formInline.sel1 && !this.formInline.sel2) {
						if (item.name == this.formInline.sel1) {
							this.data2.push(item)
						}
					} else if (!this.formInline.sel1 && this.formInline.sel2) {
						if (item.label == this.formInline.sel2) {
							this.data2.push(item)
						}
					} else {
						if (item.label == this.formInline.sel2 && item.name == this.formInline.sel1) {
							this.data2.push(item)
						}
					}
				})
			},
			axioxData () {
				this.listLoading = true
				setTimeout(() => {
					this.listLoading = false
					this.data = [
						{id: 1, name: 'H1C', label: 'L1A'},
						{id: 2, name: 'H1B', label: 'L1A'},
						{id: 3, name: 'L1A', label: 'L3A'},
						{id: 4, name: 'H1B', label: 'L2A'},
						{id: 5, name: 'L1A', label: 'L1A'},
						{id: 5, name: 'H1C', label: 'L2B', cc: '1'}
					]
					this.data2 = this.data
				}, 500)
			}
		},
		mounted () {
			this.axioxData()
		}
	}
</script>

<style scoped>
	.sel-form {
		padding-left: 20px;
	}
</style>
