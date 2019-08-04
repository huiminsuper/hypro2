<template>
	<section style="display: flex;flex-direction: column; ">
		<div id="toolBar" style="position: absolute;z-index: 10;">
			<el-button style="color: red;" size="mini" id="addCircle">add圆123</el-button>
			<el-button size="mini" >add矩形</el-button>
			<el-button @click="del" style="color: red;" size="mini" id="del">删除</el-button>
			<el-button size="mini" id="addCustom1">自定义型1</el-button>
			<!-- <el-button size="mini" id="addCustom2">自定义型2</el-button>
			<el-button size="mini" id="addCustom3">自定义型3</el-button> -->
			<el-button size="mini" id="addLine">添加直线</el-button>
			<el-button style="color: red;" size="mini" @click="lineDash">添加虚线箭头</el-button>
			<el-button style="color: red;" size="mini" id="addArrowLine" @click="addArrowLine">添加箭头直线</el-button>
			<el-button style="color: red;" size="mini" id="addVH" @click="addVH">添加VH</el-button>
			<el-button style="color: red;" size="mini" id="addHV" @click="addVH">添加HV</el-button>
			<el-button style="color: red;" size="mini" id="addHVH" @click="addVH">添加HVH</el-button>
			<el-button style="color: red;" size="mini" id="addVHV" @click="addVH">添加VHV</el-button>
			<el-button size="mini" id="addSmooth">添加曲线</el-button>
			<el-button style="color: red;" size="mini" id="drag">拖拽模式</el-button>
			<el-button style="color: red;" size="mini" id="edit">编辑模式</el-button>
			<el-button style="color: red;" size="mini" id="consoleJSON" @click="saveJson">输出json()</el-button>
			<el-button size="mini" @click="routeTo(-1)">返回</el-button>
		</div>
		<div style="flex: 1;display: flex;margin-top: 28px;">
			<el-col id="addRect" style="width: 200px; border-right: 1px solid #ccc;">
				<input type="text" value="123" v-model="mark" placeholder="输入流程标识" />
				<input type="text" value="" v-model="name" placeholder="输入流程名称" />
				<h5>插件</h5>
				<p @click="create(item, 'rect')" v-for="(item, index) in list" style="cursor: pointer;" >{{item}}</p>
				<h5>流程</h5>
				<!-- <p @click="create(item, 'rhombus')" v-for="(item, index) in list2" style="cursor: pointer;">{{item}}</p> -->
				<p @click="create(item, 'rect')" v-for="(item, index) in list2" style="cursor: pointer;" >{{item}}</p>
				<ul class="itempanel">
				  <li class="getItem" data-shape="PS-SMART" data-type="node" data-size="170*34">
				    <span class="panel-type-icon"></span>PS-SMART 分类
				  </li>
				</ul>
			</el-col>
			
			<div style="flex: 1; display: flex;" id="mountNode"></div>
			
			<el-col id="showProcess" style="width: 200px; border-left: 1px solid #ccc;">
				<p v-for="(item, index) in newList" @click="showProcess(item)" style="cursor: pointer;" >{{item.mark}}</p>
			</el-col>
		</div>
	
	</section>
</template>

<script>
	
	export default {
		data() {
			return {
				
				i: 1,
				pos: 1,
				mark: '123',
				name: '45',
				list: [
					'ascat_owv_fusion_pro',
					'Aux_DLTS',
					'C__',
					'C2aBOX',
					'C2aSIG'
				],
				list2: [
					'Hy1_dpp_OCT_L3_pro_process',
					'Hy1_Czi_L0BL1L2_Process',
					'Hy1_dpp_l0a_pro_process',
					'Hy1_OCT_L0BL1L2_Process',
					'Hy1_dpp_std_L0BL1L2_Process'
				],
				newList: [],
				flag: false,
				cssArr: ['k-means','random-forest','PS-SMART','Bayes','read-data-base']
			}
		},
		mounted() {
			this.initG6();
			
		},
		methods: {
			lineDash(){ // 添加虚线箭头
				
				this.net.beginAdd('edge', {
					shape: 'arrow',
					type: 'dashArrow'
					//shape: 'polyLineFlow'
					// shape: 'VHV'
				});
			},
			addArrowLine(){ // 添加实线箭头
				this.net.beginAdd('edge', {
					shape: 'arrow',
					type: 'solidArrow'
					//shape: 'polyLineFlow'
					// shape: 'VHV'
				});
			},
			addCustom1(){
				net.beginAdd('node', {
					  label: '[未定义]',
					  shape: 'customNode1'//<====
				});
			},
			addVH(){ // 添加折线
				this.net.beginAdd('edge', {
					shape: 'VH'
				});
			},
			addHV(){ // 添加折线
				this.net.beginAdd('edge', {
					shape: 'HV'
				});
			},
			addHVH(){ // 添加折线
				this.net.beginAdd('edge', {
					shape: 'HVH'
				});
			},
			addVHV(){ // 添加折线
				this.net.beginAdd('edge', {
					shape: 'VHV'
				});
			},
			randomFrom(min, max){
				return Math.floor(Math.random() * (max - min + 1) + min); // eg: 2——8 // (8 - 2 + 1) + 2 
			},
			create(item, shape) { // 新增框
				console.log(this.randomFrom(0, this.cssArr.length));
				this.pos += 1;
				this.net.add('node', {
					//shape: shape === 'rect' ? 'fourAnchorRect' : 'fourAnchorCircle', // 'rect'/'rhombus'
					//shape: 'k-means',
					shape: this.cssArr[this.randomFrom(0, this.cssArr.length)],
					//label:  item + '\n' + item,
					label:  item,
					style: {
						fill: 'green', // 框的填充
						stroke: 'orange', // 框的描边
						fillOpacity: 0.5, // 填充的透明度
						padding: ' 0 10px',
						
					},
					id: 'id' + this.i++,
					/* x: 50 + this.pos * 10,
					y: 50 + this.pos * 10, */
					x: 100,
					y: 60,
					
				});
				
				this.net.refresh();
			},
			del(ev) {
				this.flag = true;
				this.net.remove(ev.item);
				this.net.refresh();
			},
			drag() { // 流程图拖拽
				this.net.changeMode('drag');
			},
			saveJson() {
				const saveData = this.save();
				const json = JSON.stringify(saveData, null, 2);
				console.log(saveData, json); // eslint-disable-line no-console
			},
			initG6() { /* 参考页面 text.vue */
					
				  let data = {
					// nodes: [
					//     { id: '0', label: '起始123', val: '起始123', shape: 'k-means', size: 40},
					//     { id: '1', label: '步骤一', val: '步骤一',shape: 'random-forest' },
					//     { id: '2', label: '步骤二', val: '步骤二', shape: 'PS-SMART' },
					//     { id: '3', label: '条件',val: '条件',shape: 'Bayes' },
					//     { id: '4.1', label: '分步骤一分步骤一', val: '分步骤一分步骤一' , shape: 'read-data-base'},
					//     { id: '4.2', label: '分步骤二分步骤二...', val: '分步骤二分步骤二分步骤二', shape: 'k-means' },
					//     { id: '5', label: '汇总Hy1_dpp_std_...', val: '汇总Hy1_dpp_std_CZI_L1L2_pro_Process',shape: 'random-forest' },
					//     { id: '6', label: '结束',val: '结束', size: 40, color: 'red',shape: 'PS-SMART' },
					// ],
					nodes: [ //
					    { id: '0', label: '起始123', val: '起始123', size: 40},
					    { id: '1', label: '步骤一', val: '步骤一', },
					    { id: '2', label: '步骤二', val: '步骤二',  },
					    { id: '3', label: '条件',val: '条件', },
					    { id: '4.1', label: '分步骤一分步骤一', val: '分步骤一分步骤一' ,},
					    { id: '4.2', label: '分步骤二分步骤二...', val: '分步骤二分步骤二分步骤二', },
					    { id: '5', label: '汇总Hy1_dpp_std_...', val: '汇总Hy1_dpp_std_CZI_L1L2_pro_Process', },
					    { id: '6', label: '结束',val: '结束', size: 40, color: 'red', },
					],
					edges: [
					    { id: '0-1', source: '0', target: '1', shape: 'arrow',type: 'dashArrow' },
					    { id: '1-2', source: '1', target: '2' ,shape: 'arrow_circle', type: 'dashArrow'},
					    { id: '2-3', source: '2', target: '3'  ,shape: 'arrow_circle', type: 'solidArrow'},
					    { id: '3-4.1', source: '3', target: '4.1' ,shape: 'arrow_circle', type: 'solidArrow'},
					    { id: '3-4.2', source: '3', target: '4.2' ,shape: 'arrow_circle' ,tyep: 'dashArrow'},
					    { id: '4.1-5', source: '4.1', target: '5' ,shape: 'arrow_circle',type: 'dashArrow' },
					    { id: '4.2-5', source: '4.2', target: '5' ,shape: 'arrow_circle', type: 'solidArrow' },
					    { id: '5-6', source: '5', target: '6' ,shape: 'arrow_circle', type: 'solidArrow' },
					]
				  };
				//   提交一个 vue pro
				  data.nodes.forEach((item, index) => {
					  item.shape = this.cssArr[index%this.cssArr.length]
				  });
				//    data.edges.forEach((item, index) => {
				// 	  item.shape = item.shape === "" ? "arrow" : item.shape
				//   });
				  console.log(data.nodes)
				  let self = this;
				  self.plugin = new G6.Plugins['layout.dagre']({
				  	rankdir: 'LR'
				  });
				  self.Util = G6.Util;
				  console.log("window.innerHeight: ", window.innerHeight)
				 self.net = new G6.Net({
					id: 'mountNode',               // dom id
					height: window.innerHeight,    // 画布高
					fitView: 'autoZoom',
					// grid: null,
					grid: {
						forceAlign: true, // 是否支持网格对齐
						cell: 25,         // 网格大小
						line: {           // 网格线样式
							stroke: '#ebeef5'
						}
					},
					plugins: [self.plugin],
				  });
				  self.net.tooltip({
				  	  //title: '标题', // @type {String} 标题
				  	  split: ':',  // @type {String} 分割符号
				  	  dx: 10,       // @type {Number} 水平偏移
				  	  dy: 10        // @type {Number} 竖直偏移		
				  });	
				 /* G6.registerNode('rect', {
				  	getAnchorPoints() {
				  		return [
				  			[-0.2, 0.5],
				  			[1.2, 0.5],
				  			[0.5, 1.2],
				  			[0.5, -0.2],
				  		];
				  	}
				  }, 'rect'); */
				/* G6.registNode('fourAnchorRect', {
					  // 不使用锚点（ 自动连接中心 ）
					 getAnchorPoints: function(){
					    return [
						    
					    ];
					}
				});
				G6.registNode('fourAnchorClick', {
					  // 不使用锚点（ 自动连接中心 ）
					 getAnchorPoints: function(){
					    return 'auto';
					}
				}); */
				
				// self.net.edge().size(obj => { // 设置线
				// 	if(obj.type === 'dashArrow'){
				// 		return {
				// 			stroke: 'purple',
				// 			strokeOpacity: 1,
				// 			arrow: true,
				// 			fill: 'green'
				// 			//lineDash: [5,5]
				// 		}
				// 	}else if (obj.type === 'solidArrow') {
				// 		return {
				// 			stroke: 'purple',
				// 			strokeOpacity: 1,
				// 			fill: 'green',
				// 			arrow: true,
				// 		}
				// 	}
				// })
				// ***************************
				// 添加移动的小圆球
				 G6.registEdge('arrow_circle', {
					draw: function(cfg, group) {
						console.log(cfg);
						console.log(group);
						let model = cfg.model;
						var points = cfg.points;
						var label = cfg.label;
						var pointsArr = [];
						var totalLength = 0;
						var speed = 0.1; // 0.1 像素每毫秒
						var p2;
						var newCfg;
						var shape;
						self.Util.each(points, function(p1, i){
						pointsArr.push([p1.x, p1.y]);
						p2 = points[i+1];
						if(p2){
							totalLength += Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
						}
						});
						
						newCfg = {
							attrs: {
								points: pointsArr,
								stroke: 'blue',
								arrow: true,
								lineDash: [0,0]
							}
						};
						if(model.type === 'dashArrow'){ 
							newCfg.attrs.lineDash = [5,5] // 此属性变成虚线
						} else if(model.type === 'solidArrow'){
							newCfg.attrs.lineDash = [0,0] // 为[0,0]为实线
						}
						
						shape = group.addShape('polyline', newCfg);
						var tinyPoint = group.addShape('circle', {
							attrs: {
								x: points[0].x,
								y: points[0].y,
								r: 2,
								fill: 'red'
							}
						});
						tinyPoint.animate({
							onUpdate: function(frame, ratio){
								var p = shape.getPoint(ratio);
								frame.attrs.x = p.x;
								frame.attrs.y = p.y;
								},
							repeat: true
						}, totalLength/speed);
						return shape;
					}
				});
				// ***************************

				//==========================================
				
				G6.registerNode('model-card', {
				 // draw(item) {
					draw(item, group) {
					//   console.log(123123123)
					  console.log(item);
					  console.log(group);
					  
					  
				   //const group = item.getGroup();
				    const model = item.model;
				    const width = 184;
				    //const width = 300;
				    const height = 40;
				    const x = -width / 2;
				    const y = -height / 2;
				    const borderRadius = 4;
				    const keyShape = group.addShape('rect', {
				      attrs: { // 节点的设置
				        x,
				        y,
				        width,
				        height,
				        radius: borderRadius,
					  fill: 'black',
					  fillOpacity: '0.1',
				        stroke: '#CED4D9'
				      }
				    });
				    // 左侧色条
				    group.addShape('path', {
				      attrs: {
				        path: [
				          [ 'M', x, y + borderRadius ],
				          [ 'L', x, y + height - borderRadius ],
				          [ 'A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height ],
				          [ 'L', x + borderRadius, y ],
				          [ 'A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius ]
				        ],
					  fill: this.color_type,
				      }
				    });
				    // 类型 logo // 左侧的icon 
				    group.addShape('image', { 
				      attrs: {
				        img: this.type_icon_url,
				        x: x + 16,
				        y: y + 12,
				        width: 20,
				        height: 16
				      }
				    });
				    // 名称文本
				    const label = model.label ? model.label : this.label;
				    group.addShape('text', {
				      attrs: { 
				        text: label,
				        x: x + 47,
				        y: y + 13 + 2,
				        textAlign: 'start',
					  textBaseline: 'top',
					  //fill: 'rgba(0,0,0,0.65)'
					  fill: 'black'
				      }
				    });
				    // 状态 logo // 右侧的 icon
				    	group.addShape('image', { 
						attrs: {
						img: this.state_icon_url,
						x: x + 158,
						// x: x + 274,
						y: y + 12,
						width: 16,
						height: 16
						}
					});
				    	return keyShape;
				  },
				  // 设置锚点
				  anchor: [
				    [ 0.5, 0 ], // 上面边的中点
				    [ 0.5, 1 ] // 下边边的中点
				  ]
				});
				
				// k 均值聚类 (1)
				G6.registerNode('k-means', {
					label: 'k 均值聚类',
					color_type: '#1890FF',
					type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
					state_icon_url: '../../static/images/icon002.png',
					//state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
					// 设置锚点
					anchor: [
					[ 0.5, 0, {
						type: 'input'
					}], // 上面边的中点
					[ 0.5, 1, {
						type: 'output'
					}] // 下边边的中点
					]
				}, 'model-card');
				
				// 随机森林 (2)
				G6.registerNode('random-forest', {
					label: '随机森林',
					color_type: '#9254DE',
					type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
					//state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
					//state_icon_url: '../../static/images/satellite-1.png',
					state_icon_url: '../../static/images/003.png',
					// 设置锚点
					anchor: [
					[ 0.5, 0, {
						type: 'input'
					}],
					[ 0.5, 1, {
						type: 'output'
					}]
					]
				}, 'model-card');
				
				// PS-SMART 分类 (3)
				G6.registerNode('PS-SMART', {
					label: 'PS-SMART 分类',
					color_type: '#1890FF',
					type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
					//state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
					state_icon_url: '../../static/images/003.png',
					// 设置锚点
					anchor: [
					[ 0.5, 0, {
						type: 'input'
					}],
					[ 0.33, 1, {
						type: 'output'
					}],
					[ 0.66, 1, {
						type: 'output'
					}]
					]
				}, 'model-card');
				
				// 朴素贝叶斯 (4)
				G6.registerNode('Bayes', {
					label: '朴素贝叶斯',
					color_type: '#9254DE',
					type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
					//state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
					state_icon_url: '../../static/images/003.png',
					// 设置锚点
					anchor: [
					[ 0.5, 0, {
						type: 'input'
					}],
					[ 0.5, 1, {
						type: 'output'
					}]
					]
				}, 'model-card');
				
				// 读数据表 (5)
				G6.registerNode('read-data-base', {
					label: '读数据表',
					color_type: '#FAAD14',
					type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
					//state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
					state_icon_url: '../../static/images/003.png',
					// 设置锚点
					anchor: [
					[ 0.5, 1, {
						type: 'output'
					}]
					]
				}, 'model-card');
				
				  
				  // ==========================
				  let readData = {
					  source: data
				  }
				  
				 // self.net.source(data.nodes, data.edges);
				 self.net.read(readData)
				 
				  self.net.node().tooltip(['val','id']);
				  self.net.render();
				self.net.on("dblclick", ev => { // 双击 添加或编辑 节点自定义信息
					console.log('双击事件：', ev);
				});
				self.net.on("itemclick", ev => { // 双击 添加或编辑 节点自定义信息
					console.log('单击事件 itemclick: ', ev);
					if(self.flag){
						self.del(ev); // 执行删除操作
						self.flag = false;
					}
				});
// 				net.on("mouseenter",ev=>{
// 					console.log('mouseenter: ',ev );
// 				})
				console.log("=====", G6.version)
				
			},
			
			routeTo(s) {
				if(s === -1) {
					this.$router.go(-1);
				} else {
					this.$router.push(s);
				}
			},
			showProcess (item) {
				//this.net.changeData();
				this.mark = item.mark;
				this.name = item.name;
				
				/* let _saveData = this.net.save();
				this.net.destroy();  //销毁画布
				this.initG6();
				this.net.read(_saveData);
				this.net.render() */
				
				let saveD = {
					guides: [],
					source: null
				}
				console.log('item: ', item);
				saveD.source = item;
				console.log('saveD: ', saveD);
				this.net.read(saveD);
				this.net.render();
			},
		}
	}
</script>

<style>
	.el-button+.el-button {
		margin-left: 0;
	}
	#mountNode > .graph-container {
		flex: 1;
	}
	
	.g6-tooltip-list {
		text-align: left;
	}
	
	.panel-type-icon{
	  width: 16px;
	  height: 16px;
	  display: inline-block;
	  vertical-align: middle;
	  margin-right: 8px;
	  background: url(https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg)
	}
	.itempanel li{
	  color: rgba(0,0,0,0.65);
	  border-radius: 4px;
	  width: 160px;
	  height: 28px;
	  line-height: 26px;
	  padding-left: 8px;
	  border: 1px solid rgba(0,0,0,0);
	  list-style-type: none;
	}
	.itempanel li:hover{
	  background: white;
	  border: 1px solid #CED4D9;
	  cursor: move;
	  	/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
	}
</style>
