<template>
	<section class="section-padding-top">
		<el-col :span="24" class="search-div">
			<el-form :inline="true" ref="argForm" :model="argForm">
				<el-button>新增</el-button>
				
				<!-- 选择卫星 -->
				<el-form-item label="载荷类别:" prop="satelliteName">
					<el-select v-model="argForm.satelliteName" placeholder="选择载荷" @change="handleChanged">
						<el-option
							v-for="item in satelliteNameList"
							:key="item.id"
							:value="item.name"
							:label="item.name"
						></el-option>
					</el-select>
				</el-form-item>
				<!-- 选择产品级别 -->
				<el-form-item label="产品级别:" prop="satelliteLevel">
					<el-select v-model="argForm.satelliteLevel" placeholder="选择产品级别" @change="handleLevelChanged">
						<el-option
							v-for="item in satelliteLevelList"
							:key="item.id"
							:value="item.name"
							:label="item.name"
						></el-option>
					</el-select>
				</el-form-item>
				<!-- 时间选择 -->
				<el-form-item label="时间范围:" prop="timeRange">
					<el-date-picker v-model="argForm.timeRange" type="datetimerange" :clearable="false" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleTimeChanged">
					</el-date-picker>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="useData" v-loading="listLoading">
			<el-table-column label="产品ID" prop= "DataId" align="center" />
			<el-table-column label="文件类型" prop= "FileType" width="100px" align="center" />
			<el-table-column label="载荷类型" prop= "CatagoryId" width="100px" align="center" />
			<el-table-column label="产品级别" prop= "SemanticsLevel" width="100px" align="center" />
			<el-table-column label="成像时间" prop= "ImageTime" width="190px" align="center" />
			<el-table-column label="生产时间" prop= "CataTime" width="200px" align="center" />
		</el-table>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%" id="conf" v-dialogDrag>
		  <span>这是一段信息</span>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="sure">确 定</el-button>
		  </span>
		</el-dialog>
		<div id="refDiv" style="width: 100px;height: 100px;background: red;">我不知道你在想什么</div>
	</section>
</template>

<script>
	import $ from 'jquery'
	export default {
		data () {
			return {
				dialogVisible: false,
				listLoading: false,
				argForm: {
					satelliteName: '选择载荷',
					satelliteLevel: '选择产品级别',
					// timeRange: [this.$mount().add('-7', 'days'), this.$mount().add('7', 'days')]
				},
				satelliteNameList: [
					{ id: 0, name: '选择载荷' },
					{ id: 1, name: 'OCT' },
					{ id: 2, name: 'SCS' },
					{ id: 3, name: 'CZI' },
					{ id: 4, name: 'UVI' },
					{ id: 5, name: 'AIS' },
					{ id: 6, name: 'TLM' },
					{ id: 7, name: 'GPS' }
				],
				satelliteLevelList: [
					{ id: 0, name: '选择产品级别' },
					{ id: 1, name: 'L0A' },
					{ id: 2, name: 'L0B' },
					{ id: 3, name: 'L1A' },
					{ id: 4, name: 'L1B' },
					{ id: 5, name: 'L1C' },
					{ id: 6, name: 'L2A' },
					{ id: 7, name: 'L2B' },
					{ id: 8, name: 'L2C' },
					{ id: 9, name: 'L2D' },
					{ id: 10, name: 'L3A' },
					{ id: 11, name: 'L3B' },
					{ id: 12, name: 'L3C' },
					{ id: 13, name: 'L3' },
					{ id: 14, name: 'L4A' },
					{ id: 15, name: 'L4B' }
				],
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
				useData: []
			}
		},
		mounted () {
// 			document.getElementById('conf').getElementsByTagName('el-dialog')[0].setAttribute('id','conf2')
// 			let title = this.getByClass("el-dialog__header","conf2")[0];
// 			title.onmousedown=this.fdown();
			
			this.getAxiosData()
			/* this.$layer.open({
			  type: 0, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
			  title: '信息2',
			  content: $('#refDiv'),
			  area: 'auto',
			  offset: 'auto',
			  btn: '确定',
			  shade: true,
			  yes: '',
			  cancel: '',
			  tipsMore: false,//是否允许多个tips
			  shadeClose: false,
			});*/
			/* setInterval(()=>{
				this.getData()
			},1000) */
		},
		methods: {
			 getByClass(clsname,parent){
			    var par,arr,eles=[];
			    if(parent){
			        par=document.getElementById(parent);
			    }else{
			        par=document;
			    }
				console.log('par: ', par);
			    arr=par.getElementsByTagName('*');
			    //console.log(arr);
			    for(var i=0;i<arr.length;i++){
			        if(arr[i].className==clsname){
			            eles.push(arr[i]);
			        }
			    }
			    //console.log(eles);
			    return eles;
			},
			fdown(event){
			    //希望面板跟着光标走，下面需要获得面板
			    var panel=document.getElementById("loginPanel");
			    //console.log(panel);
			    //光标按下时，光标和面板的相对距离
			    event = event || window.event;
			    var reX=event.clientX-panel.offsetLeft;
			    var reY=event.clientY-panel.offsetTop;
			    //console.log(reX);
			    //当按下鼠标就应该加上在元素内部移动的事件了也就是move,因为是在整个页面移动所以是document
			    //这里的event是面板移动时候的事件
			    //获得left和top的最大值
			    var MX=(document.documentElement.clientWidth || document.body.clientWidth)-panel.offsetWidth;
			    var MY=(document.documentElement.clientHeight || document.body.clientHeight)-panel.offsetHeight;
			    console.log(MX);
			    document.onmousemove=function(event){
			        event = event || window.event;
			        var X=event.clientX-reX;
			        var Y=event.clientY-reY;
			        if(X<0){
			            X=0;
			        }else if(X>MX){
			            X=MX;
			        }
			        if(Y<0){
			            Y=0;
			        }else if(Y>MY){
			            Y=MY;
			        }
			        panel.style.left=X +'px';
			        panel.style.top=Y +'px';
			        console.log(X)
			        console.log(Y)
			    }
				document.onmouseup=function(){
				    document.onmousemove=null;
				}
			},
			sure() {
				
			},
			getData(){
				console.log('name111111111111: ',this.argForm.satelliteName);
			},
			handleChanged () {
				
			},
			handleLevelChanged () {
				
			},
			handleTimeChanged () {
				
			},
			getAxiosData () {
				this.listLoading = true
				setTimeout(() => {
					this.listLoading = false
					this.sourcesData = [
						{
							DataId: 'H1C_OPER_SCS_L0A_00251_20180924t132319_20180924t133507_BJS',
							ProdTaskId: 'hy_10a_pro_20180924_013551_51490',
							MmmId: 'H1C',
							FileClass: 'OPER',
							FileType: 'SCS_L0A',
							CatagoryId: 'SCS',
							SemanticsLevel: 'L0A',
							ImageTime: '2018-09-24T13:23:19.000',
							CataTime: '2018-09-24T13:37:21.000',
							path: '/jadsd09/ahsdsadDASDL/'
						}
					]
					this.useData = this.sourcesData
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	
</style>
