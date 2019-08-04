<template>
	<section>
		<div style="text-align: left; padding-left: 20px;">
			<!-- <el-button size="mini" icon="el-icon-d-arrow-left" @click="goBack(-1)">返回2</el-button> -->
		</div>
		<el-table :data="useData" v-loading="listLoading">
			<!-- <el-table-column label="状态">
				<template slot-scope="scope">
					<el-tooltip class="item" effect="dark" content="成功" placement="left">
						<el-tag slot type="success">success</el-tag>
					</el-tooltip>
					
				</template>
			</el-table-cloumn> -->
			<el-table-column label="状态" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.DataId==='Sub2'">
						<el-tooltip effect="dark" content="成功" placement='right'>
							<el-tag type="success">success</el-tag>
						</el-tooltip>
					</div>
					
					<div v-else-if="scope.row.DataId==='Sub2_2'">
						<el-tooltip effect="dark" content="失败" placement="right">
							<el-tag type="danger">danger</el-tag>
						</el-tooltip>
					</div>
					<div v-else-if="scope.row.DataId==='Sub2_3'">
						<el-tooltip effect="dark" content="失败" placement="right">
							<el-tag type="info">info</el-tag>
						</el-tooltip>
					</div>
					<div v-else>
						<el-tooltip effect="dark" content="失败" placement="right">
							<el-tag type="warning">warning</el-tag>
						</el-tooltip>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="产品ID" prop= "DataId" align="center" />
			<el-table-column label="文件类型" prop= "FileType" width="100px" align="center" />
			<el-table-column label="载荷类型" prop= "CatagoryId" width="100px" align="center" />
			<el-table-column label="产品级别" prop= "SemanticsLevel" width="100px" align="center" />
			<el-table-column label="成像时间" prop= "ImageTime" width="190px" align="center" />
			<el-table-column label="生产时间" prop= "CataTime" width="200px" align="center" />
			<el-table-column label="操作" width="80px" align="center">
				<template slot-scope="scope">
					<el-button size="mini" icon="el-icon-picture" title="子页面0" @click="handleSub2(scope.$index, scope.row)" />
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				listLoading: false,
				sourcesData: [],
				useData: []
			}
		},
		mounted () {
			this.getAxiosData()
		},
		methods: {
			goBack (r) {
				if (r === -1) {
					this.$router.go(-1)
				} else {
					this.$router.push(r)
				}
			},
			handleSub2 (index, row) {
				this.$router.push('/Sub3')
			},
			getAxiosData () {
				this.listLoading = true
				setTimeout(() => {
					this.listLoading = false
					this.sourcesData = [
						{
							DataId: 'Sub2',
							ProdTaskId: 'Sub2hy_10a_pro_20180924_013551_51490',
							MmmId: 'H1C',
							FileClass: 'OPER',
							FileType: 'SCS_L0A',
							CatagoryId: 'SCS',
							SemanticsLevel: 'L0A',
							ImageTime: '2018-09-24T13:23:19.000',
							CataTime: '2018-09-24T13:37:21.000',
							path: '/jadsd09/ahsdsadDASDL/',
							drplanId: '000000234'
						},
						{
							DataId: 'Sub2_2',
							ProdTaskId: 'Sub2hy_10a_pro_20180924_013551_51490',
							MmmId: 'H1C',
							FileClass: 'OPER',
							FileType: 'SCS_L0A',
							CatagoryId: 'SCS',
							SemanticsLevel: 'L0A',
							ImageTime: '2018-09-24T13:23:19.000',
							CataTime: '2018-09-24T13:37:21.000',
							path: '/jadsd09/ahsdsadDASDL/',
							drplanId: '000000234'
						},
						{
							DataId: 'Sub2_3',
							ProdTaskId: 'Sub2hy_10a_pro_20180924_013551_51490',
							MmmId: 'H1C',
							FileClass: 'OPER',
							FileType: 'SCS_L0A',
							CatagoryId: 'SCS',
							SemanticsLevel: 'L0A',
							ImageTime: '2018-09-24T13:23:19.000',
							CataTime: '2018-09-24T13:37:21.000',
							path: '/jadsd09/ahsdsadDASDL/',
							drplanId: '000000234'
						},
						{
							DataId: 'Sub2_0',
							ProdTaskId: 'Sub2hy_10a_pro_20180924_013551_51490',
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
				}, 500)
			}
		}
	}
</script>

<style scoped>
	
</style>
