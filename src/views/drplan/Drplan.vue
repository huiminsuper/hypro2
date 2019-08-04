<template>
	<section>
		<!-- <el-col :span="24" class="search-div">
			<Breadcrumb class="breadcrumb-container"></Breadcrumb>
		</el-col> -->
		<el-table :data="useData" v-loading="listLoading">
			<el-table-column label="产品ID" prop= "DataId" align="center" />
			<el-table-column label="文件类型" prop= "FileType" width="100px" align="center" />
			<el-table-column label="载荷类型" prop= "CatagoryId" width="100px" align="center" />
			<el-table-column label="产品级别" prop= "SemanticsLevel" width="100px" align="center" />
			<el-table-column label="成像时间" prop= "ImageTime" width="190px" align="center" />
			<el-table-column label="生产时间" prop= "CataTime" width="200px" align="center" />
			<el-table-column label="操作" width="80px" align="center">
				<template slot-scope="scope">
					<el-button size="mini" icon="el-icon-picture" title="子页面0" @click="handleSub0(scope.$index, scope.row)" />
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24"><el-button size="small" @click="add">新增</el-button></el-col>
		<el-dialog title="注册导入插件信息"
			:visible.sync="dialogVisible"
			width="20%" top="20px">
			<div class="main">
				<el-col :span="24">
					<el-upload
						action=""
						ref="upload-ref"
						accept="text/xml"
						:data="otherData"
						:http-request="uploadFileMethod"
						:on-change="changeUpload"
						:file-list="myFileList">
						<el-button size="small">请选择模板文件</el-button>
					</el-upload>
				</el-col>
			</div>
			<span slot="footer">
				<el-button @click="dialogVisible=false">否</el-button>
				<el-button @click="addYes">提交</el-button>
			</span>
		</el-dialog>
		<el-col :span="24">
			<el-form :inline="true" ref="argForm" :model="argForm">
				<el-form-item label="xml:">
					<el-input style="width: 1000px; height: 300px;" type="textarea" v-model="argForm.des" @change="change"></el-input>
				</el-form-item>
			</el-form>
					<el-button @click="save">提交</el-button>
		</el-col>
	</section>
</template>

<script>
	/* import Breadcrumb from '@/components/breadcrumb/breadcrumb' */
	import axios from 'axios';
	
	export default {
		data () {
			return {
				listLoading: false,
				argForm: {
					satelliteName: '选择载荷',
					satelliteLevel: '选择产品级别',
					// timeRange: [this.$mount().add('-7', 'days'), this.$mount().add('7', 'days')]
					/* des: '<?xml version="1.0"> encoding="UTF-8"?<lpf_Job_Order xmlns:xsl="htpp://www.w3.org/2001/XMLSchoema_lnstance" xsl:type="record_JobOrder+Configuration_Type" schemaVersion <lpf_Conf><Process_Name>hy2_sca_l13a_qcs</Process_Name>' */
					des:"<?xml version=\"1.0\" encoding=\"UTF-8\"?><WorkerXml KeyName=\"Hy2_Auto_All_Process\" WorkerType=\"Process\" LocalName=\"海洋二号卫星实时处理流程\" WorkerId=\"Hy2_Auto_All_Process_20190407_167538\">\n	<Nodes>\n	<Node>\n	<NodeId>node_181028072018_0010</NodeId>\n	<NodeType>Process</NodeType>\n	</Node>\n	</Nodes>\n	</WorkerXml>\n"
				},
				sourcesData: [],
				useData: [],
				// 上传相关
				otherData: null,
				myFileList: [],
				uploadParams: null,
				dialogVisible: false
			}
		},
		mounted () {
			this.getAxiosData()
		},
		methods: {
			change (val) {
					console.log("change:", val);
			},
			save (val) {
				console.log("save:", val);
			},
			uploadFileMethod (param) {
				this.uploadParams = param;
			},
			addYes() {
				let fileObject = this.uploadParams.file;
				let formData = new FormData();
				
				console.log('fileObject: ', fileObject);
				
				formData.append("file", fileObject);
				formData.append("data", this.uploadParams);
				
				/* axios.post(this.baseUrl + '', formData, {'Content-Type': 'multipart/form-data'}).
					then((res) => {
						this.dialogVisible = false;
						this.refs['upload-ref'].clearFiles();
						
					}).catch((err) => {
						
					}) */
			},
			changeUpload (file, fileList) {
				this.myFileList = fileList.slice(-1);
			},
			add() {
				this.dialogVisible = true;
				this.myFileList = [];
			},
			handleSub0 (index, row) {
				this.$router.push('/subDrplan/' + row.drplanId)
			},
			getAxiosData () {
				this.listLoading = true;
				let str = "a12345_678"
				let reg = /^[a-zA-Z][a-zA-Z0-9_-]{0,9}$/
				console.log('123: ', reg.test(str));
				//console.log('random: ', );
				let m = 999999, n = 100000;
				// 100000-999999 Math.round(Math.random()*(m-n))+n; (+1后包括最大值和最小值)
				setInterval(() => { 
					console.log('随机数: ', Math.floor(Math.random()*(m-n+1)) + n);
				}, 2000)
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
							path: '/jadsd09/ahsdsadDASDL/',
							drplanId: '000000234'
						}
					]
					this.useData = this.sourcesData
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	.main > div > div {
		display: flex;
	}
</style>
<!-- <template>
	<el-menu
		class="el-menu-vertical-demo"
		:collapse="isCollapse"
		background-color="rgb(73, 80, 96)"
		text-color="rgba(255,255,255,0.7)"
		unique-opened
		@select="handleMenuSelect"
		>
		<Menu :menuList="menuList"></Menu>
		<breadcrumbNav :currentPath="breads"></breadcrumbNav>
	</el-menu>
</template>

<script>
	import breadcrumbNav from './components/breadcrumb/breadcrumb.vue'
	import Menu from './components/menu/Menu.vue'
	export default {
		data () {
			return {
				breads: [],
				isCollapse: false,
				menuList: [
					{
						children: ['a', 'b', 'c', 'd'],
						resourceId: 0,
						resourceName: 'Amy'
					},
					{
						children: ['aa', 'bb', 'cc', 'dd'],
						resourceId: 1,
						resourceName: 'Amy1'
					}
				]
			}
		},
		methods: {
			handleMenuSelect (index, indexPath) {
				this.breads = indexPath
			}
		},
		components: {
			Menu,
			breadcrumbNav
		}
	}
</script>
 -->
