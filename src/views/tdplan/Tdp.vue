<template>
	<section class="section-padding-top">
		<el-scrollbar style="height: 100%;">
		<el-col :span="24" class="search-div">
			<el-form :inline="true" ref="argForm" :model="argForm" :rules="rules">
				<el-form-item label="卫星名称:" prop="satellite">
					<!-- 选择卫星 -->
					<el-select v-model="argForm.satelliteId" placeholder="选择卫星" >
						<el-option
							v-for="item in satelliteList"
							:key="item.id"
							:value="item.name"
							:label="item.name"
						></el-option>
					</el-select>
				</el-form-item>
				<!-- 输入框轨道号 -->
				<el-form-item label="轨道号:">
					<el-input v-model="argForm.orbitId" type="number" ref="order"  placeholder="输入轨道号" @input="handleOrbit" oninput="if(value.length>5)value=value.slice(0,5); if(value.length === 1)value=value == 0?'1':value"></el-input><!-- oninput="if(value.length>5)value=value.slice(0,5); if(value.length === 1)value=value == 0?'1':value" -->
				</el-form-item>
				<!-- 时间选择 -->
				<el-form-item label="时间范围:" prop="timeRange">
					<el-date-picker v-model="argForm.timeRange" type="datetimerange" :clearable="false" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleTimeChanged">
					</el-date-picker>
				</el-form-item>
				<el-button @click="toG6One">to g6 one</el-button>
			</el-form>
		</el-col>
		<el-col :span="24">
			<p>{{str}}</p>
			<!-- <Index @saveData="saveDataFn">saveDataFn</Index> -->
		</el-col>
		<el-table :data="useData" v-loading="listLoading">
			<el-table-column label="状态" type="selection"
				@select="handleSelect">
			</el-table-column>
			<el-table-column label="数传计划号" prop= "dtPlanID" width="150px" align="center" />
			<el-table-column label="卫星标识" prop= "satelliteID" width="90px" align="center" />
			<el-table-column label="轨道号" prop= "orbitID" width="120px" align="center" />
			<el-table-column label="任务规划号" prop= "tplanID" width="150px" align="center" />
			<el-table-column label="星上数开始时间" prop= "startTime" width="240px" align="center" />
			<el-table-column label="星上数结束时间" prop= "stopTime" width="240px" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="mini" class="el-icon-d-arrow-right" title="对应子计划" @click="handleSubTdplan(scope.$index, scope.row)"></el-button>
					<el-button size="mini" class="el-icon-download" title="对应接收计划"></el-button>
					<el-button size="mini" class="el-icon-date" title="对应产品"></el-button>
					<el-button size="mini" class="el-icon-picture" title="对应流程"></el-button>
				</template>
			</el-table-column>
			
		</el-table>
		<!-- <div v-if="contArr" v-for="(item, index) in newArr" :key="index">{{item}}：{{contArr[index]}}</div> -->
		</el-scrollbar>
	</section>
</template>

<script>
	import Index from '../../components/g6_2.vue'
	
	export default {
		name: 'tdp',
		components: { Index },
		data () {
			return {
				listLoading: false,
				argForm: {
					satelliteId: '选择卫星',
					orbitId: ''
					// timeRange: [this.$mount().add('-7', 'days'), this.$mount().add('7', 'days')]
				},
				rules: {
					orbitId: [
						{ pattern:/^\d{0, 5}$/, message: '长度在 0 到 6 个字符', trigger: 'blur' }
					]
				},
				pickerOptions: {
					shortcuts: [
						{
							text: '未来一天',
							onClick (picker) {
								const end = new Date()
								const start = new Date()
								end.setTime(start.getTime() + 3600 * 1000 * 24)
								picker.$emit('pick', [start, end])
							}
						},
						{
							text: '未来三天',
							onClick (picker) {
								const end = new Date()
								const start = new Date()
								end.setTime(start.getTime() + 3600 * 1000 * 3)
								picker.$emit('pick', [start, end])
							}
						},
						{
							text: '未来一周',
							onClick (picker) {
								const end = new Date()
								const start = new Date()
								end.setTime(start.getTime() + 3600 * 1000 * 7)
								picker.$emit('pick', [start, end])
							}
						}
					]
				},
				sourcesData: [],
				useData: [],
				satelliteList: [
					{ id: 0, name: '选择卫星' },
					{ id: 1, name: 'H1C' },
					{ id: 2, name: 'H1D' },
					{ id: 3, name: 'H2D' },
					{ id: 4, name: 'H2C' },
					{ id: 5, name: 'CFO' }
				],
				arr: ['ALT','ALT_L0A','ALT_LOB','ALT','ALT_L0A','ALT_LOC'],
				newArr: null,
				contArr: null,
				dd: [
						{
							"AIS": 2,
							"count": {
								"AIS_L0A": 1,
								"AIS_L0B": 2
							}
						},
						{
							"CZI": 2,
							"count": {
								"CZI_L0A": 1,
								"CZI_L0B": 2,
								"CZI_L2": 3
							},
							newArray:[{
								k:'LOA',
								v:'1'
							},{
								k:'LOC',
								v:'2'
							}],
							ARRAT:[1 , ,2 ]
						},
						{
							"all": 123
						}
					],
				kk: ["L0A","L0B","L0C"],
				newDATA: null,
				timer: null,
				str: ''
			}
		},
		mounted () {
			// this.(),
			this.get();
			this.getAxiosData();
			this.getNewData();
			this.str = 'a,jsdkljdkladkls\n阿里空间都是垃圾袋';
			
			let arr = this.str.split('\n');
			
			console.log('this.str: ', this.str);
			console.log('arr[0]: ', arr[0]);
			console.log('arr[1]: ', arr[1]);
		},
		beforeDestory() {
			clearInterval(this.timer)
		},
		methods: {
			saveDataFn(data){
				console.log('data: ', data);
			},
			toG6One () {
				clearInterval(this.timer);
				this.$router.push({
					path: '/g6',
					name: 'g6'
				})
			},
			handleSelect (selection, row) {
				console.log('selection: ', selection);
				console.log('row: ', row);
			},
			handleSubTdplan (index, item) {
				console.log(index, item)
			},
			get () { // 选择卫星号
				this.newArr = [...new Set(this.arr)]
				
				this.contArr = new Array(this.newArr.length)
				
				for (let i = 0; i < this.contArr.length; i++) {
					this.contArr[i] = 0
				}
				
				
				this.newArr.forEach((item,index) =>{
					this.arr.forEach((item2,index2) => {
						//console.log('当前item是：'+item+';当前item2是：'+item2);
						if (item == item2) {
							this.contArr[index]++
							//console.log('contArr的第几个'+index+'；是几：'+this.contArr[index]);
						}
					})
					
				})
				
				console.log("==============")
				// es6 的 Set 处理
				let subSet = function (arr1, arr2) {
					let set1 = new Set(arr1);
					let set2 = new Set(arr2);
					
					let subset = [];
					for(let item of set1) {
						if(!set2.has(item)) {
							subset.push(item);
						}
					}
					return subset;
				}
				
				let newArr = subSet(['A','d','f'], ['d', 'e', 'g', 'y']);
				console.log('es6 Set 方法', newArr); //  ['A', 'f']
				
				console.log('object 方法: ', "-----------------");
				Array.prototype.minus = function(arr) {
					let result = new Array();
					let obj = {}
					for(let i = 0; i < arr.length; i++) {
						obj[arr[i]] = 1;
					}
					for(let j = 0; j < this.length; j++) {
						if(!obj[this[j]]) {
							obj[this[j]] = 1;
							result.push(this[j]);
						}
					}
					return result;
				}
				
				console.log('111: ', ['d', 'e', 'g', 'y'].minus(['A','d','f']));
				
			},
			handleOrbit (value) { // 输入轨道号
			console.log(value);
			
				/* let reg = /^[1-9][0-9]{1, 4}/;
				if(!reg.test(this.argForm.orbitId)){
					this.argForm.orbitId = ''
				} */
				// 要做长度判断
				
				  /* if (this.$refs.order.value.length > 4) {
					this.$refs.order.value = this.$refs.order.value.slice(0, 5)
					this.argForm.orbitId = this.$refs.order.value
				    }	
				    this.argForm.orbitId = this.$refs.order.value; */
				    console.log("this.argForm.orbitId: ", this.argForm.orbitId)
				// this.argForm.orbitId
				/* let reg = /^[1-9][0-9]{1, 4}$/;
				let reg2 = /[^\d]/g; */
					//value= value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')
				//this.argForm.orbitId = val.replace(/[^\d]/g, '');
				///val = val.replace(/[^\d]/g, '').replace(/{5, }/g, '');
				/* if(val.length === 0) {
					console.log(1111)
					this.argForm.orbitId = '';
				}else if(val.length === 1){
					console.log(2222)
					this.argForm.orbitId = val == 0 ? '1' : val;
				} else if(val.length>5){
					val=val.slice(0,5)
					this.argForm.orbitId = val;
				}else {
					console.log(3333)
					this.argForm.orbitId = val
				} */
				/* if(reg2.test(val)){
					console.log('aaaaaaaaaaaa')
					this.argForm.orbitId = '1';
				} else { // 数字
				console.log('bbbbbbbbbbbbbb');
					
					if(val.length === 0) {
						console.log(1111)
						this.argForm.orbitId = '';
					}else if(val.length === 1){
						console.log(2222)
						this.argForm.orbitId = val == 0 ? '1' : val;
					}else {
						console.log(3333)
						this.argForm.orbitId = val
					}
				} */
				
				 console.log("this.argForm.orbitId: ", this.argForm.orbitId)
				
			},
			handleTimeChanged () { // 选择日期
				
			},
			getAxiosData () {
				this.listLoading = true
				setTimeout(() => {
					this.listLoading = false;
					for(let i = 0; i < 100; i++) {
						this.sourcesData.push({
							dtPlanID: '000009592, ' + i,
							satelliteID: 'H1C',
							orbitID: '375, ' + i,
							tplanID: '00000000033',
							obsDmdID: '',
							startTime: '2018-10-03T11:46:05.000',
							stopTime: '2018-10-03T11:46:05.000',
							prodStage: '0',
							planxml: '这是一个xml串儿'
						})
					}
					
					this.useData = this.sourcesData
				}, 500)
			},
			getNewData () {
				this.timer = setInterval(() => {
					for(let i = 0; i < 99; i++) {
						this.newDATA.push({
							dtPlanID: '000009592, ' + i,
							satelliteID: 'H1C',
							orbitID: '375, ' + i,
							tplanID: '00000000033',
							obsDmdID: '',
							startTime: '2018-10-03T11:46:05.000',
							stopTime: '2018-10-03T11:46:05.000',
							prodStage: '0',
							planxml: '这是一个xml串儿'
						});
					}
					this.newDATA.unshift({
						dtPlanID: '000009592, ' + 'new',
						satelliteID: 'H1C',
						orbitID: '375, ' + 'new',
						tplanID: '00000000033',
						obsDmdID: '',
						startTime: '2018-10-03T11:46:05.000',
						stopTime: '2018-10-03T11:46:05.000',
						prodStage: '0',
						planxml: '这是一个xml串儿'
					})
				}, 300000);
				
				/* Array.prototype.minus = function(arr) {
					let result = new Array();
					let obj = {}
					for(let i = 0; i < arr.length; i++) {
						obj[arr[i]] = 1;
					}
					for(let j = 0; j < this.length; j++) {
						if(!obj[this[j]]) {
							obj[this[j]] = 1;
							result.push(this[j]);
						}
					}
					return result;
				} */
				
				// console.log('123: ', this.newDATA.minus(this.sourcesData));
			}
		}
	}
</script>

<style scoped>
	
</style>
