<template>
	<section>
		这是一个空的 .vue 文件
		<div id="myChart" style="width: 100%; height: 300px;"></div>
	</section>
</template>

<script>
	import echarts from 'echarts'
	import $ from 'jquery'
	export default {
		data () {
			return {
				myChart: null,
				HEIGHT_RATIO: 0.6,
				DIM_CATEGORY_INDEX: 0,
				DIM_TIME_ARRIVAL: 1,
				DIM_TIME_DEPARTURE: 2,
				DATA_ZOOM_AUTO_MOVE_THROTTLE: 30,
				DATA_ZOOM_X_INSIDE_INDEX: 1,
				DATA_ZOOM_Y_INSIDE_INDEX: 3,
				DATA_ZOOM_AUTO_MOVE_SPEED: 0.2,
				DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH: 30,
				
				_draggable: null,
				_draggingEl: null,
				_dropShadow: null,
				_draggingCursorOffset: [0, 0],
				_draggingTimeLength: null,
				_draggingRecord: null,
				_dropRecord: null,
				cartesianXBounds_: [],
				cartesianYBounds_: [],
				rawData: {
					parkingApron: {
						dimensions:[
							"Name",
							"Type",
							"Near Bridge"
						],
						data:[
								// this.clipRectByRect
								
								
								/* [
									"开机",
									"S",
								],
								[
									"成像",
									"P",
								] */
							]
					},
					flight: {
						dimensions:[
							"Parking Apron Index",
							"Arrival Time",
							"Departure Time",
							"Flight Number",
							"VIP",
							"Arrival Company",
							"Departure Company",
							"Arrival Line",
							"Departure Line",
							"Report Time"
						],
						data:[
							
							[
								1.4, // y轴位置
								1551891756000, // 开始时间
								1551892721000, // 结束时间
								"成像", 
								
							],
							[
								1.4,
								1551904201000,
								1551904664000,
								"成像", 
								
							],
							
							[
								2,
								1551904201000,
								1551904664000,
								"开机",
								
							],
							[
								2,
								1551932430000,
								1551933113000,
								"开机", 
								
							]
						]	
					}
				},
				_autoDataZoomAnimator: null,
			}
		},
		mounted () {
			this.getRandomNum();
			this.initChart();
			
		},
		methods: {
			getData(){
				/* $.get('https://echarts.baidu.com/examples/data/asset/data/airport-schedule.json', (rawData) => {
					this.rawData = rawData;
					this.initChart();
				}); */
			},
			initChart(){
				let option = null;
				this.myChart = echarts.init(document.getElementById('myChart'));
				this.myChart.setOption(option = this.makeOption());
			},
			getRandomNum () {
				let p = new Promise((resolve, reject) => {
					// 异步操作
					setTimeout(() => {
						let num = Math.ceil(Math.random() * 10) // 获取一个 0-10 的随机数
						if(num <= 5) {
							resolve(num)
						}else {
							reject('随机数为：' + num + ', 大于5')
						}
					}, 1000)
				});
				// then的第二个参数相当于 catch,但是catch 还有个一个别的功能就是resolve 里面有代码出错，报错会在走到catch后暴露出来并不会报错卡死，而then的第二个参数只会报错卡死
				/* p.then((data) => { 
					console.log('resolve: ', data);
					console.log(aa);
					console.log(123);
				}, (error) => {
					console.log('reject: ', error);
				}) */
				p.then((data) => { 
					console.log('resolve: ', data);
					console.log(aa);
					console.log(123);
				}).catch((error) => {
					console.log('reject: ', error);
				})
			},
		
			makeOption () {
				return {
					tooltip: {
						textStyle: {
							align: 'left'
						}
					},
					/* textStyle: { // 全局字体设置
						color: 'black',
						textBorderWidth: 0
					}, */
					animation: false,
					toolbox: {
						left: 20,
						top: 0,
						itemSize: 20,
						feature: {
							myDrag: {
								show: true,
								title: 'Make bars\ndraggable',
								
								onclick: this.onDragSwitchClick
							}
						}
					},
					title: {
						text: 'Gantt of Airport Flight',
						left: 'center'
					},
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						filterMode: 'weakFilter',
						height: 20,
						bottom: 0,
						start: 0,
						end: 100,
						handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
						handleSize: '80%',
						handleStyle: {
							color: '#CCC' ,
							shadowBlur: 10,
							shadowOffsetX: 2,
							shadowOffsetY: 2
						},
						showDetail: true, // 拖拽滑块时 显示详细信息
						textStyle: { // 对详细信息进行设置
							color: 'purple'
						}
					}, {
						type: 'inside',
						id: 'insideX',
						xAxisIndex: 0,
						filterMode: 'weakFilter',
						start: 0,
						end: 26,
						zoomOnMouseWheel: true,
						moveOnMouseMove: true
					}, /* { // 去掉 右侧 竖向 滚轮占用
						type: 'slider',
						yAxisIndex: 0,
						zoomLock: true,
						width: 10,
						right: 10,
						top: 70,
						bottom: 20,
						start: 0, // 设置竖向滚轮开始位置
						end: 100, // 设置竖向滚轮结束位置
						handleSize: 0,
						showDetail: false,
					}, {
						type: 'inside',
						id: 'insideY',
						yAxisIndex: 0,
						start: 0,
						end: 100,
						zoomOnMouseWheel: false,
						moveOnMouseMove: true,
						moveOnMouseWheel: true
					} */],
					grid: {
						show: false,
						top: 70,
						bottom: 20,
						left: 30, // 整个图形距离左边的距离
						right: 30,
						backgroundColor: '#fff',
						borderWidth: 0
					},
					xAxis: {
						type: 'time',
						position: 'top',
						offset: 15,// 设置刻度上的时间位置
						splitLine: {
							show: false, // 时间刻度对应的竖线
							lineStyle: {
								color: ['#E9EDFF'],
								width: 1,
								type: 'solid'
							}
						},
						axisTick: {
							lineStyle: {
								color: '#929ABA'
							}
						},
						axisLabel: {
							color: '#929ABA',
							inside: false,
							align: 'center'
						}
					},
					yAxis: {
						axisTick: {show: false,},
						splitLine: {show: false},
						axisLine: {show: false},
						axisLabel: {show: false},
						min: 0,
						max: 4
						// max: this.rawData.parkingApron.data.length,
					},
					series: [{
						id: 'flightData',
						type: 'custom',
						color: function(params){ // 条形的填充色 及 鼠标划过显示
							if(params.data[3] == '开机') {
								// return '#cbebcb7d'
								return 'green';
							} else {
								// return '#fce4b97a';
								return 'orange';
							}
						}, 
						renderItem: this.renderGanttItem,
						dimensions: this.rawData.flight.dimensions,
						encode: {
							x: [this.DIM_TIME_ARRIVAL, this.DIM_TIME_DEPARTURE],
							y: this.DIM_CATEGORY_INDEX,
							tooltip: [this.DIM_CATEGORY_INDEX, this.DIM_TIME_ARRIVAL, this.DIM_TIME_DEPARTURE]
						},
						label: { // 只更改图形上字体
							normal: {
								textStyle: {
									color: 'blue'
								}
							}
						},
						data: this.rawData.flight.data
					}, 
					{
						type: 'line',
						markLine: {
							silent: true,
							name: 'aa',
							lineStyle: {
								color: '#ccc',
								type: 'solid',
								width: 1
							},
							// symbol: ['circle', 'arrow'],
							symbolSize: [3,5],
							label: {
								//show: false
							},
							data: [
								{
									yAxis: 2, // 显示平行于 x 轴的平行线
									label: {
										show: false
									}
								},
								//[
									
									/* {x:0,y:2},
									{x:1551904664000/2, y:2} */
									/* {
										coord: [0, 1],
										lineStyle: {color:'red',type: 'solid'},
										symbol: 'circle',
										symbolSize: 3,
									},
									{
										coord: [1551904664000, 1],
										lineStyle: {color:'red',type: 'solid'},
										symbol: 'arrow',
										symbolSize: [5,5],
									}, */
								//],
								[
								{ // 成像
									coord: [1551891756000, 0],
									value: this.rawData.flight.data.length,
									lineStyle: {color:'orange',type: 'solid'},
									symbol: 'arrow',
									symbolSize: [5,5],
									
								},
								{ // 成像
									// coord: [1551891756000,this.rawData.parkingApron.data.length],
									coord: [1551891756000,3],
									lineStyle: {color:'orange',type: 'solid'},
									value: 1551891756000, 
									label: {
										position: 'start',
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbol: 'circle',
									symbolSize: 3,
								},
							],[
								{ // 成像
									coord: [ 1551892721000, 0],
									value: 1551892721000, 
									symbol: 'arrow',
									symbolSize: [5,5],
								},
								{ // 成像
									// coord: [1551892721000,this.rawData.parkingApron.data.length],
									coord: [1551892721000,3],
									value: 1551892721000, 
									lineStyle: {color:'orange',type: 'solid'},
									label: {
										position: 'start',
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbol: 'circle',
									symbolSize: 3,
								}
							],
							[
								{  // 成像
									coord: [ 1551904201000, 0],
									value: 1551904201000,
									lineStyle: {color:'orange',type: 'solid'},
									symbol: 'arrow',
									symbolSize: [5,5],
								},
								{  // 成像
									// coord: [1551904201000,this.rawData.parkingApron.data.length],
									coord: [1551904201000,3],
									value: 1551904201000,
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbol: 'circle',
									symbolSize: 3,
								},
							],[
								{ // 成像
									coord: [ 1551904664000, 0],
									value: 1551904664000,
									lineStyle: {color:'orange',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbol: 'arrow',
									symbolSize: [5,5],
								},
								{ // 成像
									// coord: [1551904664000,this.rawData.parkingApron.data.length],
									coord: [1551904664000,3],
									value: 1551904664000,
									lineStyle: {color:'orange',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbol: 'circle',
									symbolSize: 3,
								},
							],
							[
								{  // 开机
									coord: [ 1551904201000, 0],
									value: 1551904201000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: 3,
								},
								{  // 开机
									// coord: [1551904201000,this.rawData.parkingApron.data.length],
									coord: [1551904201000,4],
									value: 1551904201000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: [5,5],
								},
							],[
								{  // 开机
									coord: [ 1551932430000, 0],
									value: 1551932430000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: 3,
								},
								{ // 开机
									// coord: [1551932430000,this.rawData.parkingApron.data.length],
									coord: [1551932430000,4],
									value: 1551932430000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: [5,5],
								},
							],[
								{  // 开机
									coord: [ 1551933113000, 0],
									value: 1551933113000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: 3,
								},
								{ // 开机
									// coord: [1551933113000,this.rawData.parkingApron.data.length],
									coord: [1551933113000,4],
									value: 1551933113000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: [5,5],
								},
							],[
								{ // 开机
									coord: [ 1551904664000, 0],
									value: 1551904664000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: 3,
								},
								{ // 开机
									// coord: [1551904664000,this.rawData.parkingApron.data.length],
									coord: [1551904664000,4],
									value: 1551904664000,
									lineStyle: {color:'green',type: 'solid'},
									label: {
										formatter:function(params){
											return new Date(params.value).getHours()+':'+new Date(params.value).getMinutes()+':'+new Date(params.value).getSeconds()
										},
									},
									symbolSize: [5,5],
								},
							]]
						}
					},
					{
						type: 'custom',
						color: 'purple', // 鼠标划过 y轴
						renderItem: this.renderAxisLabelItem,
						dimensions: this.rawData.parkingApron.dimensions,
						encode: {
							x: -1, // Then this series will not controlled by x.
							y: 0
						},
						label: { // 只更改图形上字体
							normal: {
								textStyle: {
									color: 'blue'
								}
							}
						},
						data: echarts.util.map(this.rawData.parkingApron.data, function (item, index) {
							return [index].concat(item);
						})
					}]
				};	
			},
			renderGanttItem(params, api) {
				var categoryIndex = api.value(this.DIM_CATEGORY_INDEX);
				var timeArrival = api.coord([api.value(this.DIM_TIME_ARRIVAL), categoryIndex]);
				var timeDeparture = api.coord([api.value(this.DIM_TIME_DEPARTURE), categoryIndex]);

				var coordSys = params.coordSys;
				this.cartesianXBounds_[0] = coordSys.x;
				this.cartesianXBounds_[1] = coordSys.x + coordSys.width;
				this.cartesianYBounds_[0] = coordSys.y;
				this.cartesianYBounds_[1] = coordSys.y + coordSys.height;

				var barLength = timeDeparture[0] - timeArrival[0];
				// Get the heigth corresponds to length 1 on y axis.
				var barHeight = api.size([0, 1])[1] * this.HEIGHT_RATIO;
				var x = timeArrival[0];
				var y = timeArrival[1] - barHeight;

				var flightNumber = api.value(3) + '';
				var flightNumberWidth = echarts.format.getTextRect(flightNumber).width;
				var text = (barLength > flightNumberWidth - 50 && x + barLength >= 0)
					? flightNumber : '';
				
				var rectNormal = this.clipRectByRect(params, {
					x: x, y: y, width: barLength, height: barHeight
				});
				var rectVIP = this.clipRectByRect(params, {
					x: x, y: y, width: (barLength) / 2, height: barHeight
				});
				var rectText = this.clipRectByRect(params, {
					x: x, y: y, width: barLength, height: barHeight
				});
				
				return {
					type: 'group',
					children: [{
						type: 'rect',
						ignore: !rectNormal,
						shape: rectNormal,
						style: api.style({})
					}, {
						type: 'rect',
						ignore: !rectVIP && !api.value(4),
						shape: rectVIP,
						style: api.style({}) // 黄色部分
						// style: api.style({fill: '#ddb30b'}) // 黄色部分
					}, {
						type: 'rect',
						ignore: !rectText,
						shape: rectText,
						style: api.style({
							//fill: 'transparent',
							//stroke: 'transparent',
							text: text,
							//textFill: '#fff' // 柱形上字体颜色
						})
					}]
				};
			},
			renderAxisLabelItem(params, api) {
				var y = api.coord([0, api.value(0)])[1];
				if (y < params.coordSys.y + 5) {
					return;
				}
				return { // white
					type: 'group',
					position: [
						10,
						y
					],
					children: [{
						type: 'path',
						shape: {
							d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z',
							x: 0,
							y: -20,
							width: 90,
							height: 20,
							layout: 'cover'
						},
						style: {
							fill: '#368c6c' // y轴颜色
						}
					}, {
						type: 'text',
						style: { // y 轴左侧 “成像/开机”文字
							x: 24,
							y: -3,
							text: api.value(1),
							textVerticalAlign: 'bottom',
							textAlign: 'center',
							textFill: '#fff'
						}
					}, { // y 靠y轴线 P/S 文字
						type: 'text',
						style: {
							x: 75,
							y: -2,
							textVerticalAlign: 'bottom',
							textAlign: 'center',
							text: api.value(2),
							textFill: '#000'
						}
					}]
				};
			},
			clipRectByRect(params, rect) {
				return echarts.graphic.clipRectByRect(rect, {
					x: params.coordSys.x,
					y: params.coordSys.y,
					width: params.coordSys.width,
					height: params.coordSys.height
				});
			},
			
			onDragSwitchClick(model, api, type) {
				this._draggable = !this._draggable;
				myChart.setOption({
					dataZoom: [{
						id: 'insideX',
						disabled: this._draggable
					}, {
						id: 'insideY',
						disabled: this._draggable
					}]
				});
				this.model.setIconStatus(type, this._draggable ? 'emphasis' : 'normal');
			},

			/* initDrag() {

				_autoDataZoomAnimator = makeAnimator(dispatchDataZoom);

				myChart.on('mousedown', function (param) {
					if (!this._draggable || !param || param.seriesIndex == null) {
						return;
					}

					// Drag start
					this._draggingRecord = {
						dataIndex: param.dataIndex,
						categoryIndex: param.value[this.DIM_CATEGORY_INDEX],
						timeArrival: param.value[this.DIM_TIME_ARRIVAL],
						timeDeparture: param.value[this.DIM_TIME_DEPARTURE]
					};
					var style = {lineWidth: 2, fill: 'rgba(255,0,0,0.1)', stroke: 'rgba(255,0,0,0.8)', lineDash: [6, 3]};

					this._draggingEl = addOrUpdateBar(this._draggingEl, this._draggingRecord, style, 100);
					this._draggingCursorOffset = [
						this._draggingEl.position[0] - param.event.offsetX,
						this._draggingEl.position[1] - param.event.offsetY
					];
					this._draggingTimeLength = this._draggingRecord.timeDeparture - this._draggingRecord.timeArrival;
				});

				myChart.getZr().on('mousemove', function (event) {
					if (!this._draggingEl) {
						return;
					}

					var cursorX = event.offsetX;
					var cursorY = event.offsetY;

					// Move this._draggingEl.
					this._draggingEl.attr('position', [
						this._draggingCursorOffset[0] + cursorX,
						this._draggingCursorOffset[1] + cursorY,
					]);

					prepareDrop();

					autoDataZoomWhenDraggingOutside(cursorX, cursorY);
				});

				myChart.getZr().on('mouseup', function () {
					// Drop
					if (this._draggingEl && this._dropRecord) {

						updateRawData() && myChart.setOption({
							series: {
								id: 'flightData',
								data: this.rawData.flight.data
							}
						});
					}
					dragRelease();
				});
				myChart.getZr().on('globalout', dragRelease);

				function dragRelease() {
					_autoDataZoomAnimator.stop();

					if (this._draggingEl) {
						myChart.getZr().remove(this._draggingEl);
						this._draggingEl = null;
					}
					if (this._dropShadow) {
						myChart.getZr().remove(this._dropShadow);
						this._dropShadow = null;
					}
					this._dropRecord = this._draggingRecord = null;
				}

				function addOrUpdateBar(el, itemData, style, z) {
					var pointArrival = myChart.convertToPixel('grid', [itemData.timeArrival, itemData.categoryIndex]);
					var pointDeparture = myChart.convertToPixel('grid', [itemData.timeDeparture, itemData.categoryIndex]);

					var barLength = pointDeparture[0] - pointArrival[0];
					var barHeight = Math.abs(
						myChart.convertToPixel('grid', [0, 0])[1] - myChart.convertToPixel('grid', [0, 1])[1]
					) * this.HEIGHT_RATIO;

					if (!el) {
						el = new echarts.graphic.Rect({
							shape: {x: 0, y: 0, width: 0, height: 0},
							style: style,
							z: z
						});
						myChart.getZr().add(el);
					}
					el.attr({
						shape: {x: 0, y: 0, width: barLength, height: barHeight},
						position: [pointArrival[0], pointArrival[1] - barHeight]
					});
					return el;
				}

				function prepareDrop() {
					// Check droppable place.
					var xPixel = this._draggingEl.shape.x + this._draggingEl.position[0];
					var yPixel = this._draggingEl.shape.y + this._draggingEl.position[1];
					var cursorData = myChart.convertFromPixel('grid', [xPixel, yPixel]);
					if (cursorData) {
						// Make drop shadow and this._dropRecord
						this._dropRecord = {
							categoryIndex: Math.floor(cursorData[1]),
							timeArrival: cursorData[0],
							timeDeparture: cursorData[0] + this._draggingTimeLength
						};
						var style = {fill: 'rgba(0,0,0,0.4)'};
						this._dropShadow = addOrUpdateBar(this._dropShadow, this._dropRecord, style, 99);
					}
				}

				// This is some business logic, don't care about it.
				function updateRawData() {
					var flightData = this.rawData.flight.data;
					var movingItem = flightData[this._draggingRecord.dataIndex];

					// Check conflict
					for (var i = 0; i < flightData.length; i++) {
						var dataItem = flightData[i];
						if (dataItem !== movingItem
							&& this._dropRecord.categoryIndex === dataItem[this.DIM_CATEGORY_INDEX]
							&& this._dropRecord.timeArrival < dataItem[this.DIM_TIME_DEPARTURE]
							&& this._dropRecord.timeDeparture > dataItem[this.DIM_TIME_ARRIVAL]
						) {
							alert('Conflict! Find a free space to settle the bar!');
							return;
						}
					}

					// No conflict.
					movingItem[this.DIM_CATEGORY_INDEX] = this._dropRecord.categoryIndex;
					movingItem[this.DIM_TIME_ARRIVAL] = this._dropRecord.timeArrival;
					movingItem[this.DIM_TIME_DEPARTURE] = this._dropRecord.timeDeparture;
					return true;
				}

				function autoDataZoomWhenDraggingOutside(cursorX, cursorY) {
					// When cursor is outside the cartesian and being dragging,
					// auto move the dataZooms.
					var cursorDistX = getCursorCartesianDist(cursorX, this.cartesianXBounds_);
					var cursorDistY = getCursorCartesianDist(cursorY, this.cartesianYBounds_);

					if (cursorDistX !== 0 || cursorDistY !== 0) {
						_autoDataZoomAnimator.start({
							cursorDistX: cursorDistX,
							cursorDistY: cursorDistY
						});
					}
					else {
						_autoDataZoomAnimator.stop();
					}
				}

				function dispatchDataZoom(params) {
					var option = myChart.getOption();
					var optionInsideX = option.dataZoom[this.DATA_ZOOM_X_INSIDE_INDEX];
					var optionInsideY = option.dataZoom[this.DATA_ZOOM_Y_INSIDE_INDEX];
					var batch = [];

					prepareBatch(batch, 'insideX', optionInsideX.start, optionInsideX.end, params.cursorDistX);
					prepareBatch(batch, 'insideY', optionInsideY.start, optionInsideY.end, -params.cursorDistY);

					batch.length && myChart.dispatchAction({
						type: 'dataZoom',
						batch: batch
					});

					function prepareBatch(batch, id, start, end, cursorDist) {
						if (cursorDist === 0) {
							return;
						}
						var sign = cursorDist / Math.abs(cursorDist);
						var size = end - start;
						var delta = this.DATA_ZOOM_AUTO_MOVE_SPEED * sign;

						start += delta;
						end += delta;

						if (end > 100) {
							end = 100;
							start = end - size;
						}
						if (start < 0) {
							start = 0;
							end = start + size;
						}
						batch.push({
							dataZoomId: id,
							start: start,
							end: end
						});
					}
				}

				function getCursorCartesianDist(cursorXY, bounds) {
					var dist0 = cursorXY - (bounds[0] + this.DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH);
					var dist1 = cursorXY - (bounds[1] - this.DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH);
					return dist0 * dist1 <= 0
						? 0 // cursor is in cartesian
						: dist0 < 0
						? dist0 // cursor is at left/top of cartesian
						: dist1; // cursor is at right/bottom of cartesian
				}

				function makeAnimator(callback) {
					var requestId;
					var callbackParams;
					// Use throttle to prevent from calling dispatchAction frequently.
					callback = echarts.throttle(callback, this.DATA_ZOOM_AUTO_MOVE_THROTTLE);

					function onFrame() {
						callback(callbackParams);
						requestId = requestAnimationFrame(onFrame);
					}

					return {
						start: function (params) {
							callbackParams = params;
							if (requestId == null) {
								onFrame();
							}
						},
						stop: function () {
							if (requestId != null) {
								cancelAnimationFrame(requestId);
							}
							requestId = callbackParams = null;
						}
					};
				}
		} */
		
		}
	}
</script>

<style scoped>
	
</style>