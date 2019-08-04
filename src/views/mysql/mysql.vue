<template>
	<section style="display: flex;">
		<div class="editor" style="flex: 1; display: flex;flex-direction: column;">
			<div id="toolbar">
				<i data-command="undo" class="command el-icon el-icon-arrow-left" title="撤回"></i>
				<i data-command="redo" class="command el-icon el-icon-arrow-right" title="重做"></i>
				<i data-command="delete" class="command el-icon el-icon-delete" title="删除"></i>
				<i data-command="zoomOut" class="command el-icon el-icon-zoom-out" title="缩小"></i>
				<i data-command="zoomIn" class="command el-icon el-icon-zoom-in" title="放大"></i>
				<i data-command="save" class="command el-icon el-icon-document" @click="save" title="保存"></i>
				<el-input style="width: 200px;" size="mini" v-model="workflowName" placeholder="请输入流图名称..."></el-input>
				<!-- <i data-command="undo" class="command el-icon el-icon-arrow-left" title="撤销"></i>
				<i data-command="redo" class="command el-icon el-icon-arrow-right" title="重做"></i>
				<span class="separator"></span>
				<i data-command="copy" class="command el-icon el-icon-copy" title="复制"></i>
				<i data-command="paste" class="command el-icon el-icon-paster" title="粘贴"></i>
				<i data-command="delete" class="command el-icon el-icon-delete" title="删除"></i>
				<span class="separator"></span>
				<i data-command="zoomIn" class="command el-icon el-icon-zoom-in" title="放大"></i>
				<i data-command="zoomOut" class="command el-icon el-icon-zoom-out" title="缩小"></i>
				<i data-command="autoZoom" class="command el-icon el-icon-fit" title="适应画布"></i>
				<i data-command="resetZoom" class="command el-icon el-icon-actual-size-o" title="实际尺寸"></i>
				<span class="separator"></span>
				<i data-command="toBack" class="command el-icon el-icon-to-back" title="层级后置"></i>
				<i data-command="toFront" class="command el-icon el-icon-to-front" title="层级前置"></i>
				<span class="separator"></span>
				<i data-command="multiSelect" class="command el-icon el-icon-select" title="多选"></i>
				<i data-command="addGroup" class="command el-icon el-icon-group" title="成组"></i>
				<i data-command="unGroup" class="command el-icon el-icon-ungroup" title="解组"></i>
				<span class="separator"></span>
				<i data-command="save" class="command el-icon el-icon-save" title="保存"></i>
				<a href="https://www.yuque.com/antv/g6-editor"> G6-Editor 文档</a> -->
			</div>
			<div style="height: 50px;"></div>
			<div class="bottom-container" style="flex: 1;">	
				<div id="contextmenu"></div>
				<div id="itempannel">
					<ul style="padding-left: 14px;">
						<li draggable="true" class="getItem" data-shape="k-means" data-type="node" data-size="170*34">
							<span class="panel-type-icon"></span>K 均值聚类
						</li>
						<li draggable="true" class="getItem" data-shape="random-forest" data-type="node" data-size="170*34">
							<span class="panel-type-icon"></span>随机森林
						</li>
						<li class="getItem" data-shape="PS-SMART" data-type="node" data-size="170*34">
							<span class="panel-type-icon"></span>PS-SMART 分类
						</li>
						<li class="getItem" data-shape="read-data-base" data-type="node" data-size="170*34">
							<span class="panel-type-icon"></span>读数据表
						</li>
						<li class="getItem" data-shape="Bayes" data-type="node" data-size="170*34">
							<span class="panel-type-icon"></span>朴素贝叶斯
						</li>
					</ul>
				</div>
				<div id="detailpannel">
					 <div data-status="node-selected" class="panel" id="node_detailpanel">
					  <div class="panel-title">属性详情</div>
					  <div class="block-container">
					    <el-input v-model="nodeLabel" size="mini" @change="changeNodeLabel" placeholder="请输入内容"></el-input>
					  </div>
						<div>
							<p v-for="(item, index) in names" @click="source(item)">{{item.name}}</p>
						</div>
					</div>
				</div>
				<div id="navigator">
					<div class="pannel-title">导航器</div>
					<div id="minimap"></div>
				</div>		
				<div id="page"></div>
			</div>
		</div>
	</section>
</template>

<script>
	import G6Editor from '@antv/g6-editor';

	
	export default {
	  data () {
	    return {
	      graph: null,
	      nodeLabel: '',
				workflowName: '',
				names: []
	    }
	  },
	  mounted() {
	    this.initG6Editor()
	  },
	  methods: {
			source (item) {
				this.workflowName = item.name;
				console.log('item: ', item);
			},
			save () {
				/* 验证流图名称*/
				if (this.workflowName !== '') {
				  // let data = this.net.save();
						const page = this.editor.getCurrentPage();
					  const data = page.save();
						
				  if (data.nodes.length === 0) {
				    this.$message({type: 'error', message: '流图内容不能为空'});
				    return false
				  }
				  /* 验证节点名称*/
				  for (let item of data.nodes) {
				    if (item.label === '' || item.label === null || item.label === undefined) {
				      this.$message({type: 'error', message: '节点名称不能为空'});
				      return false
				    }
				  }
				  data['name'] = this.workflowName;
					this.names.push({
						name: data.name,
						nodes: data.nodes,
						edges: data.edges
					});
					console.log('data: ', data);
					console.log('this.type: ', this.type);
				  /*let json = JSON.stringify(data, null, 2);*/
				  this.$emit('saveData', data, this.type);
				} else {
				  this.$message({type: 'error', message: '流图名称不能为空'})
				}
				/*console.log(saveData, json);*/
			},
	    // 画布保存方法
	    saveGraph() {
	      // 获取当前page
	      const page = this.editor.getCurrentPage()
	      // 保存画布
	      const data = page.save();
				console.log('data: ', data);
	    },
	    // 修改Node的label
	    changeNodeLabel(value) {
	      const editor = this.editor
	      editor.executeCommand(() => {
	        const page = editor.getCurrentPage()
	        const selectedItems = page.getSelected()
	        selectedItems.forEach(item => {
	          page.update(item.id, {
	            label: value
	          })
	        })
	      })
	    },
	    // 初始化
	    initG6Editor() {
	      // this
	      const _this = this
	      // G6Editor
	      const editor = new G6Editor()
				G6Editor.track(false);
	      // editor挂载到Vue
	      this.editor = editor
	      // Flow
	      const Flow = G6Editor.Flow
	      // Command
	      const Command = G6Editor.Command
	      
	      // 定义Save命令
	      Command.registerCommand('save', {
	        // 命令是否进入队列，默认是 true
	        queue: false,  
	        // 命令是否可用
	        enable(eidtor) {
	          return true
	        },
	        // 正向命令
	        execute(eidtor) {
						console.log(eidtor);
	          _this.saveGraph()
	        },
	        // 快捷键：Ctrl+shirt+s
	        shortcutCodes : [['ctrlKey', 'shiftKey', 's']]
	      })
	      // 主画布
	      // Mind 思维导图
	      // Koni 网络图、拓扑图
	      // Flow 流程图
	      const page = new G6Editor.Flow({
	        graph: {
	          container: 'page'
	        }
	      })
	      // 设置边样式，内置3种样式
	      // flow-polylinels
	      // flow-polyline-round
	      // flow-smooth
	      page.getGraph().edge({
	        shape: 'flow-polyline'
	      })
	      // 自定义节点
	      Flow.registerNode('customNode', {
	        draw(item){
	          const group = item.getGraphicGroup()
	          const model = item.getModel()
	          group.addShape('text', {
	            attrs: {
	              x: 0,
	              y: 0,
	              fill: '#333',
	              text: model.label
	            }
	          })
	          group.addShape('text', {
	            attrs: {
	              x: 0,
	              y: 0,
	              fill: '#333',
	              text: ' ('+model.x+', '+model.y+') \n 原点是组的图坐标',
	              textBaseline: 'top'
	            }
	          })
	          
	          return group.addShape('rect', {
	            attrs: {
	              x: 0,
	              y: 0,
	              width: 100,
	              height: 100,
	              stroke: 'red'
	            }
	          })
	        }
	      })
	      // 元素面板栏
	      const itempannel = new G6Editor.Itempannel({
	        container: 'itempannel',
	      })
	      // 工具栏
	      const toolbar = new G6Editor.Toolbar({
	        container: 'toolbar',
	      })
	      // 详细面板
	      const detailpannel = new G6Editor.Detailpannel ({
	        container: 'detailpannel'
	      })
	      // 缩略图
	      const minimap = new G6Editor.Minimap({
	        container: 'minimap',
	        height: 226,
	        width: 226
	      })
	      // 组件挂载到Editor
	      editor.add(page)
	      editor.add(itempannel)
	      editor.add(toolbar)
	      editor.add(detailpannel)
	      editor.add(minimap)
	      // 获取当前page
	      const currentPage = editor.getCurrentPage()
	      // 监听选择变化
	      currentPage.on('afteritemselected', ev => {
	        // 选择对象为Node节点
	        if (ev.item.isNode) {
	          // 获取属性
	          const nm = ev.item.getModel()
	          _this.nodeLabel = nm.label
	        }
	        // 选择对象为Edge节点
	        if (ev.item.isEdge) {
	          // 获取属性
	          const nm = ev.item.getModel()
	          _this.nodeLabel = nm.label
	        }
	      })
	    }
	  },
	}
</script>

<style scoped="">
	.bottom-container {
		position: relative;
	}
	#toolbar {
		padding: 8px 0px;
    width: 100%;
    border: 1px solid #E9E9E9;
    height: 27px;
    z-index: 1;
    box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
    position: absolute;
	}
	#toolbar .command {
		width: 27px;
    height: 27px;
    margin: 0px 6px;
    border-radius: 2px;
    padding-left: 4px;
    display: inline-block;
    border: 1px solid rgba(2,2,2,0);
	}
	#toolbar .command:nth-of-type(1) {
		    margin-left: 24px;
	}
	
	#toolbar .command:hover {
		    cursor: pointer;
    border: 1px solid #E9E9E9;
	}
	#context {
		    position: absolute;
    z-index: 2;
    top: 74.6214px;
    left: 608px;
    display: none;
	}
	#itempannel {
		height: 100%;
    position: absolute;
    left: 0px;
    z-index: 2;
    background: #F7F9FB;
    width: 200px;
    padding-top: 8px;
    border-right: 1px solid #E6E9ED;
	}
	#itempannel li {
		    color: rgba(0,0,0,0.65);
    border-radius: 4px;
    width: 160px;
    height: 28px;
    line-height: 26px;
    padding-left: 8px;
    border: 1px solid rgba(0,0,0,0);
    list-style-type: none;
	}
	#itempannel li:hover {
		    background: white;
    border: 1px solid #CED4D9;
    cursor: move;
	}
	
	#detailpannel {
		height: 100%;
    position: absolute;
    right: 0px;
    z-index: 2;
    background: #F7F9FB;
    width: 200px;
    border-left: 1px solid #E6E9ED;
	}
	#navigator {
		width: 200px;
    height: 176px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 3;
	}
	#page {
		    margin-left: 200px;
    margin-right: 200px;
		height: 100%;
	}
</style>