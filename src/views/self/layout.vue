<template>
	<section class="setFlex">
		<el-col class="side-bar">
			<h4>计算资源管理</h4>
			<el-form ref="argForm" :model="argForm">
				<el-form-item>
					<span>队列编号</span>
					<el-select v-model="argForm.number" style="width: 120px;" @change="handleSelect">
						<el-option
							v-for="(item, index) in numberList"
							:key="index"
							:value="item"
							:label="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span>资源分配策略</span>
					<el-select v-model="argForm.n" style="width: 120px;" @change="nodee">
						<el-option
							v-for="(item, index) in nodeSList"
							:key="index"
							:value="item.value"
							:label="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span>任务调度策略</span>
					<el-select v-model="argForm.j" style="width: 120px;"@change="jobb">
						<el-option
							v-for="(item, index) in jobSList"
							:key="index"
							:value="item.value"
							:label="item.label">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button-group class="self-btn-group">
				<el-button size="mini" icon="el-icon-circle-plus-outline">新增</el-button>
				<el-button size="mini" icon="el-icon-edit">编辑</el-button>
				<el-button size="mini" icon="el-icon-delete">删除</el-button>
			</el-button-group>
		</el-col>
		<el-col class="main setFlex setFlexColumn">
			<el-menu mode="horizontal" :default-active="$route.path" router>
				<template v-for="(item, index) in tabList">
					<el-menu-item :index="item.path" :key="index">{{item.subName}}</el-menu-item>
				</template>
			</el-menu>
			
			<transition name="fade-transform" mode="out-in">
				<router-view />
			</transition>
			
		</el-col>
	</section>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				tabList: [],
				argForm: {
					number: '计算资源池',
					n: '集中分配',
					j: '先入先出'
				},
				numberList: []
			}
		},
		computed: {
			...mapGetters(['nodeSList','jobSList', 'node','job']),
		},
		mounted() {
// 			console.log('this.$route: ', this.$route);
// 			console.log('this.$router: ', this.$router);
			let routes =  this.$router.options.routes[0].children
			for(let i = 0; i < routes.length; i++) {
				if(routes[i].name == 'layout') {
					this.tabList = routes[i].children;
					break;
				}
			}
			this.$store.dispatch('getQueue').then(() => {
				this.numberList = this.$store.state.control.queueList
				// console.log('this.numberList: ', this.numberList);
				
			})
			this.$store.dispatch('getQueueList', '计算资源池');
			// setInterval(() => {
				this.$store.dispatch('runningList');
				this.$store.dispatch('queueList');
			// }, 5000)
		},
		methods: {
			handleSelect (sel) {
				this.$store.commit('markVal', sel);
				this.$store.dispatch('getQueueList', sel);
			},
			nodee (n) {
				this.argForm.n = n
				// this.$store.commit('markN', n);
			},
			jobb (j) {
				this.argForm.j = j
				// this.$store.commit('markJ', n);
			}
		}
	}
</script>

<style scoped>
	.side-bar {
		position: relative;
		width: 200px;
	}
	
	.el-form-item {
		margin-bottom: 5px;
	}
	
	.side-bar .el-form-item__content > span {
		display: block;
		line-height: 30px;
	}
	
	.self-btn-group {
		position: absolute;
		bottom: 10px;
		left: 9px;
	}
	
	.self-btn-group button {
		padding: 7px 9px;
	}
	
	.main {
		flex: 1;
		border-left: 1px solid #ccc;
	}
	
	.main .el-menu.el-menu--horizontal {
		border-bottom: none;
	}
</style>
