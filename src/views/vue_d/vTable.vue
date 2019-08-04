<template>
	<section>
		<el-scrollbar style="height: 100%;">
			<h4 style="text-align: left; padding-left: 20px;">create new person</h4>
			<el-col class="form-box" :span="24">
				<el-form :inline="true" :model="paramForm">
					<el-form-item label="Name" prop="name">
						<el-input v-model="paramForm.name" type="text" placeholder="输入名称"></el-input>
					</el-form-item>
					<el-form-item label="Age" prop="age">
						<el-input v-model="paramForm.age" type="number" placeholder="输入年龄"></el-input>
					</el-form-item>
					<el-form-item label="Sex" prop="sex">
						<el-select v-model="paramForm.sex" placeholder="选择性别">
							<el-option 
								v-for="(item, index) in sexValueList"
								:key="index"
								:label="item.sexE"
								:value="item.sexC">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary">create</el-button>
				</el-form>
			</el-col>
			<el-table :data="humanInfo" :border="true">
				<el-table-column label="Name" prop="name" align="center" />
				<el-table-column label="Age" prop="age" align="center" />
				<el-table-column label="Sex" prop="sex" align="center" />
				<el-table-column label="Delete" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="deleteData(scope.$index, scope.row)">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
			<ul>
				<li v-for="(item,index) in humanInfo" @click="clickLi(index)">
					item.name
				</li>
			</ul>
		</el-scrollbar>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				paramForm: {
					name: '',
					age: '',
					sex: 'Male'
				},
				sexValueList: [
					{ sexE: 'Male', sexC: '男' },
					{ sexE: 'Female', sexC: '女' }
				],
				humanInfo: [
					{
						name: 'Jack',
						age: '20',
						sex: '男'
					},
					{
						name: 'Bill',
						age: '21',
						sex: '男'
					},
					{
						name: 'Tracy',
						age: '18',
						sex: '女'
					}
				],
				newHumnaInfo: null
			}
		},
		mounted:function(){
			setTimeout(()=>{
				this.humanInfo.push({
					name: 'Tracy11',
					age: '18',
					sex: '女'
				})
			},5000)
		},
		methods: {
			deleteData (index, row) {
				
			},
			clickLi(index){
				this.humanInfo
				
			}
		}
	}
</script>

<style scoped>
	.form-box {
		text-align: left;
		padding-left: 20px;
	}
</style>