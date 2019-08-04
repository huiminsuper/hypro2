<!-- 流程图组件 -->
<template>
	<div :class="className" :id="id" :style="{width: width,height: height,backgroundColor: bgColor}"></div>
</template>

<script>
	import echarts from 'echarts'

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			id: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '100%'
			},
			bgColor: {
				type: String,
				default: '#ccc'
			}
		},
		data() {
			return {
				chart: null,
				echartsData: [],
				echartsLinks:[]
			}
		},
		mounted() {
			this.intiChart()
		},
		beforeDestroy() { // 组件销毁之前调用(销毁之前解绑函数)
			if (!this.chart) {
				return
			}
			this.chart.dispose() // 销毁实例
			this.chart = null
		},
		methods: {
			get(){
				axios
			},
			intiChart() {
				this.chart = echarts.init(document.getElementById(this.id))
				//let graph = echarts.dataTool.gexf.parse(xml)
				/* this.chart.nodes.forEach((node) => {
					node.itemStyle = null;
					node.symbolSize = 10;
					node.value = node.symbolSize;
					node.category = node.attributes.modularity_class;
					node.x = node.y = null;
					node.draggable = true;
				}) */
				this.chart.setOption({
					title: {
						text: '流程视图',
						left: 'center',
						top: 30
					},
					tooltip: { // 鼠标滑过显示对应数据
						// formatter: '{b}<br/>{a0}:{c0}'
					},
					series: [{
						type: 'graph',
						roam: true,
						//layout: 'force',
						layout: 'none',
						//force: {
							// initLayout: 'circular',
							//repulsion: 100
							/* gravity: 0.1,
							edgeLength: 30,
							layoutAnimation: true */
						//},
						// draggable: true,
						tooltip: {
							trigger: 'item',
							axisPointer: {
								type: 'none'
							},
							backgroundColor: 'skyblue',
							formatter: function(x) { 
								// console.log(x.data.name) // 节点上的文字 可以对其进行格式化
								if(x.dataType === "edge") return
								let str = x.marker + 'xxxx: ' + x.data.value + '<br />' + x.marker + 'nnnnn: ' + x.data.name
								return str
							}
						},
						//layout: 'none',
						symbolSize: 40,
						top: 100,
						label: {
							normal: {
								show: true,
								position: 'bottom',
								offset: [0, -65], // 节点上文本的显示位置
								textStyle: {
									fontSize: 12,// 节点上文本的大小
									// color: 'black' // 文字的颜色  如果不设置默认跟随色块的颜色
								}
							}
						},
						edgeSymbol: ['', 'arrow'], // ['circle', 'arrow']
						edgeSymbolSize: [4, 10],
						cursor: 'poniter',
						lineStyle: {
							normal: {
								// color: '#2f4554'
								color: 'red',
							}
						},
						itemStyle: {
							normal: {
								label: {
									show:true,
									position: 'bottom',
									formatter: function(param) { 
										//console.log(param); // 节点上的文字 可以对其进行格式化
										//console.log(param.name) // 节点上的文字 可以对其进行格式化
										//console.log(param.value) // 节点上的文字 可以对其进行格式化
										return param.value
									}
								}
							}
						},
						// 定义节点与位置
						data: [
							{
								name: 'nodenodenode',
								value: 'gray',
								
								x: 40,
								y: 10,
								symbol: 'rect',
								// symbolSize: [100,40],
								itemStyle: {
									normal: {
										color: '#999'
									}
								}
							},
							{
								name: '节点2',
								value: 'pink',
								x: 100,
								y: 10,
								symbol: 'rect',
								itemStyle: {
									normal: {
										color: 'pink'
									}
								}
							},
							{
								name: '节点3',
								x: 160,
								y: 10,
								symbol: 'rect'
							},
							{
								name: '节点4',
								x: 100,
								y: 50,
								symbol: 'rect',
								symbolSize: [40,40],
								itemStyle: {
									normal: {
										color: '#ee5255'
									}
								}
							},
							{
								name: '节点5',
								value: 'purple',
								x: 30,
								y: 50,
								// symbol: 'roundRect',
								symbol: 'roundRect',
								symbolSize: [40, 40],
								itemStyle: {
									normal: {
										color: 'purple'
									}
								}
							},
							{
								name: '节点6',
								x: 200,
								y: 10,
								symbol: 'rect'
							},
							{
								name: '节点7',
								x: 180,
								y: 50,
								gg:['aa','bb'],
								value: 'green',
								symbol: 'rect',
								// symbolSize: [100,40],
								itemStyle: {
									normal: {
										color: 'green'
									}
								}
							},
							{
								name: '节点8',
								x: 140,
								y: 50,
								gg:[9],
								// symbol: 'circle',
								symbol: 'rect',
								itemStyle: {
									normal: {
										color: 'blue'
									}
								}
							}
						],
						links: [
							{
								source: 'nodenodenode',
								target: '节点2'
							}, {
								source: '节点2',
								target: '节点3'
							},{
								source: '节点5',
								target: '节点4'
							},{
								source: '节点2',
								target: '节点3'
							},
							{
								source: '节点2',
								target: '节点4'
							},
							{
								source: 'nodenodenode',
								target: '节点5'
							},
							{
								source: '节点3',
								target: '节点6'
							},
							{
								source: '节点3',
								target: '节点7'
							},
							{
								source: '节点3',
								target: '节点8'
							}
						]
					}]
				})
				console.log(this.chart)
				window.addEventListener('resize', () => {
					if(this.chart) {
						this.chart.resize
					}
				})
				
			}
		}
	}
</script>

<style scope>

</style>

<!-- **** -->

<!-- let objData = {}
resp.data.forEach((item,index)=>{
	objData.name = item.name
	...
	if(item.state = 0){
		objData.itemStyle.normal.color = '#ddddd'
	}else if(){
		
	}
	item.gg.forEach((it,ind)=>{
		let obj = {
			source:0,
			target:0
		}
		obj.source = index//item.name
		obj.target = it
		links.push(obj)
	})
	echarts.push(objData)
}) -->

<!-- **** -->