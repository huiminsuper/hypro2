<template>
	<section class="promise-box">
		<el-scrollbar style="height: 100%;">
			<p>(1)Promise：生成一个0~2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败</p>
			<el-button @click="testPromise2" type="primary">Click me</el-button>
			<div>
				<p>{{ startText }}</p>
				<p>{{ setTimeOutText }}</p>
				<p>{{ resolveText }}</p>
				<p>{{ resultText }}</p>
			</div>
			
			<p>(2)Promise：串行执行 一系列 需要 异步计算 获得结果 的任务</p>
			<el-button @click="testPromise3" type="danger">Click me</el-button>
			<div id="testP3">
				<p>{{ startTextP3 }}</p>
				<p>{{ startTextP33 }}</p>
				<p>{{ startTextP333 }}</p>
				<p>{{ startTextP3333 }}</p>
				<p>{{ newPromise }}</p>
				<p>{{ gotValue }}</p>
			</div>
			
			<p>(3)Promise：Promise.all 以最后一个为准/Promise.race 以第一个为准</p>
			<el-button @click="testP4All" type="success">Promise.all()</el-button>
			<el-button @click="testP4Race" type="warning">Promise.race()</el-button>
			<div>
				<p style="color: green; font-weight: bold;">{{ testP4AllText }}</p>
				<p style="color: orange; font-weight: bold;">{{ testP4RaceText }}</p>
			</div>
			<p>(4)Promise: 话费充值小栗子(功能描述：Comment Out Code... )</p>
			<!-- 功能描述：用户输入电话号码后，先查找这个电话号码所在的省和市，然后再根据省和市，找到可能充值的面值，进行展示。 -->
			<el-col :span="24" style="text-align: left; padding-left: 20px; margin-top: 30px;">
				<el-form :inline="true" ref="argForm" inline-class="form-box" :model="argForm" label-position="left">
					<el-form-item label="号码" class="form-item-one">
						<el-input v-model="argForm.phoneNum" placeholder="输入电话号码"></el-input>
						<el-button @click="getFaceResult" type="primary">sure</el-button>
						<!-- <p>您要充值的面值为: {{ argForm.money }}</p> -->
						<p>充值面值：
							<span v-for="item in argForm.faceList" :key="item" style="margin-right: 5px;">{{ item }}</span>
						</p>
					</el-form-item>
				</el-form>
			</el-col>
		</el-scrollbar>
	</section>
</template>

<script>
	import axios from 'axios'
	
	export default {
		data () {
			return {
				startText: '',
				setTimeOutText: '',
				resolveText: '',
				resultText: '',
				
				startTextP3: '',
				startTextP33: '',
				startTextP333: '',
				startTextP3333: '',
				setTimeOutTextP3: '',
				newPromise: '',
				gotValue: '',
				
				testP4AllText: '',
				testP4RaceText: '',
				// 以下是话费充值相关
				argForm: {
					phoneNum: '',
					faceList: []
				}
				
			}
		},
		methods: {
		// below is express 话费充值相关
			// 根据电话获取城市
			getLocation(phoneNum) {
				return axios.post('/phoneLocation', {
					phoneNum
				})
			},
			// 获取面值
			getFaceList (province, city) {
				return axios.post('/faceList', {
					province,
					ciry
				})
			},
			// （1）一般方法
			/* getFaceResult() { // 点击确认按钮，获取面值列表
				this.getLocation(this.argForm.phoneNum)
					.then((res) => {
						if(res.status === 200 && res.data.success){
							let province = res.data.obj.province;
							let city = res.data.obj.city;
							this.getFaceList(province, city)
								.then((res) => {
									if(res.status === 200 && res.data.obj.success){
										this.argForm.faceList = res.data.obj
									}
								})
						}
					})
					.catch((err) => {
						console.log('error: ', err);
					})
			}, */
			// （2）使用 async/await
			async getFaceResult () { // 点击确认按钮，获取面值列表
				// try/catch 处理异常
				try {
					let location = await this.getLocation(this.argForm.phoneNum)
					if(location.data.success) {
						let province = location.data.obj.province
						let city = location.data.obj.city
						let result = await this.getFaceList(province, city)
						if(result.data.success) {
							this.argForm.faceList = result.data.obj;
						}
					}
				} catch(err) {
					console.log('err: ', err);
				}
			},
			logging (idName) {
				let logging = document.getElementById(idName);
				while(logging.children.length > 1) {
					logging.removeChild(logging.children[logging.children.length - 1])
				}
				return logging
			},
			log (s, logging) {
				let p = document.createElement('p');
				p.innerHTML = s;
				logging.appendChild(p);
			},
			testPromise2 () { // 异步执行
				new Promise((resolve, reject) => {
					this.startText = 'start new Promise...'
					
					let timeOut = Math.random() * 2;
					
					this.setTimeOutText = 'set timeOut to: ' + timeOut + ' seconds'
					
					setTimeout(() => {
						if (timeOut < 1) {
							this.resolveText = 'call resolve()...'
							
							resolve('200 OK')
						} else {
							this.resolveText = 'call reject()...'
							
							reject('timeOut: ' + timeOut + ' seconds');
						}
					}, timeOut * 1000)
					
				}).then((resp) => {
					this.resultText = 'Done：' + resp
					
				}).catch((error) => {
					this.resultText = 'Failed：' + error
				})
			},
			multiply (input) { // 0.5 秒后返回 input * input 计算结果
				return new Promise((resolve, reject) => {
					this.startTextP3 = 'multiply calculating ' + input + ' x ' + input + '...';
					// let logging = this.logging('testP3');
					
					setTimeout(resolve, 500, input * input);
				});
			},
			multiplyMultiply (input) { // 0.5 秒后返回 input * input 计算结果
				return new Promise((resolve, reject) => {
					this.startTextP3333 = 'multiplyMultiply calculating ' + input + ' x ' + input + 'x' + input + '...';
					// let logging = this.logging('testP3');
					
					setTimeout(resolve, 500, input * input  * input);
				});
			},
			add (input) { // 0.5 秒后返回 input + input 计算结果
				return new Promise((resolve, reject) => {
					this.startTextP33 = 'add calculating ' + input + ' + ' + input + '...';
					// let logging = this.logging('testP3');
					
					setTimeout(resolve, 500, input + input)
				})
			},
			addAdd (input) { // 0.5 秒后返回 input + input 计算结果
				return new Promise((resolve, reject) => {
					this.startTextP333 = 'addAdd calculating ' + input + ' + ' + input + '+' + input + '...';
					// let logging = this.logging('testP3');
					
					setTimeout(resolve, 500, input + input + input)
				})
			},
			testPromise3 () { // 串行执行
				new Promise((resolve, reject) => {
					this.newPromise = 'start new Promise...'
					resolve(123);
				}).then(this.multiply).then(this.add).then(this.multiplyMultiply).then(this.addAdd).then((result) => {
					this.gotValue = 'Got value:' + result;
				})
			},
			testP4All () { // 并行执行异步任务 Promise.all()
				let p1 = new Promise((resolve, reject) => {
					setTimeout(resolve, 500, 'P1');
				});
				let p2 = new Promise((resolve, reject) => {
					setTimeout(resolve, 600, 'P2');
				});
				// 同事执行 P1 和 P2，并在它们都执行完后再执行 then
				Promise.all([p1, p2]).then((resp) => {
					console.log('resp: ', resp);
					this.testP4AllText = 'resp: ' + resp; //P1,P2(全部执行 得到一个 Array['P1', 'P2'])
				})
			},
			testP4Race () { // 并行执行异步任务 Promise.race()
				let p1 = new Promise((resolve, reject) => {
					setTimeout(resolve, 500, 'P1');
				});
				let p2 = new Promise((resolve, reject) => {
					setTimeout(resolve, 600, 'P2');
				});
				Promise.race([p1, p2]).then((resp) => {
					this.testP4RaceText = 'resp: ' + resp; // P1(以最快的那个为准，慢的就丢弃)
				})
			},
			test (resolve, reject) {
// 				var timeOut = Math.random() * 2;
// 				console.log('set timeOut to:' + timeOut + 'seconds')
// 				setTimeout(() => {
// 					if(timeOut < 1 ) {
// 						console.log('call resolve()...')
// 						resolve('200 ok')
// 					}else {
// 						console.log('call reject()...')
// 						reject('timeOut in ' + timeOut + 'seconds')
// 					}
// 				}, timeOut * 1000)
			}
		
		}
	}
	
	
	
</script>

<style scoped>
	.promise-box {
		text-align: left;
		padding: 0 10px 0;
	}
	
	.form-item-one {
		position: relative;
	}
	
	.form-item-one > div > button {
		position: absolute;
		right: -68px;
		top: 0;
	}
	
</style>
