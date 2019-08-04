<template>
	<section style="box-sizing: border-box;">
		<div style=" margin: 100px; width: 100%;height: 100%;" id="mountNode"></div>
	</section>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		mounted(){
			this.initG6()
		},
		methods: {
			initG6(){
				const data = {
						nodes: [
						    { id: '0', label: '起始123', shape: 'circle', size: 40 },
						    { id: '1', label: '步骤一' },
						    { id: '2', label: '步骤二' },
						    { id: '3', label: '条件' },
						    { id: '4.1', label: '分步骤一' },
						    { id: '4.2', label: '分步骤二' },
						    { id: '5', label: '汇总' },
						    { id: '6', label: '结束', shape: 'circle', size: 40 },
						],
						edges: [
						    { id: '0-1', source: '0', target: '1' },
						    { id: '1-2', source: '1', target: '2' },
						    { id: '2-3', source: '2', target: '3' },
						    { id: '3-4.1', source: '3', target: '4.1' },
						    { id: '3-4.2', source: '3', target: '4.2' },
						    { id: '4.1-5', source: '4.1', target: '5' },
						    { id: '4.2-5', source: '4.2', target: '5' },
						    { id: '5-6', source: '5', target: '6' },
						]
					};
					let self = this;
					let Util = G6.Util;
					self.plugin = new G6.Plugins['layout.dagre']({
						rankdir: 'LR'
					});
					self.net = new G6.Net({
						id: 'mountNode',               // dom id
						//height: window.innerHeight,    // 画布高
						fitView: 'cc',
						// grid: null,
						grid: {
							forceAlign: true, // 是否支持网格对齐
						},
						plugins: [self.plugin],
					});
					self.net.tooltip({
						  //title: '标题', // @type {String} 标题
						  split: ':',  // @type {String} 分割符号
						  dx: 10,       // @type {Number} 水平偏移
						  dy: 10        // @type {Number} 竖直偏移		
					});	
					let readData = {
						  source: data
					  }
					  
					 // self.net.source(data.nodes, data.edges);
					// self.net.read(readData)
					 self.net.read(Util.clone(readData));
					 
					 
					  self.net.node().tooltip(['label','id']);
					  self.net.render();
					self.net.on("dblclick", ev => { // 双击 添加或编辑 节点自定义信息
						console.log('双击事件：', ev);
					});
					
					
			}, // ending
			
			
			
		}
	}
</script>

<style>
</style>
