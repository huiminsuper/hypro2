// import api from './api/index-client.js'

const state = {
	queueList: ['计算资源池'],
	nodeS: [
		{ label: '负载均衡', value: 'dispersedly' },
		{ label: '集中分配', value: 'intensively' }
	],
	jobS: [
		{ label: '优先级', value: 'priority' },
		{ label: '先入先出', value: 'fifo' }
	],
	nodee: '集中分配',
	jobb: '先入先出',
	
	selValue: 'all',
	oldSelValueq: '',
	oldSelValue: '计算资源池',
	
	quList: [],
	ruList: [
		/* { "jobId": "9", "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_3" },
		{ "jobId": "6", "taskId": "Ins_hy1_c" } */
	],
	a: 0,
	a2: 0
}

const mutations = {
	['markVal'] (state, sel) {
		state.selValue = sel;
	},
	['markN'] (state, n) {
		
		
		
		if(n == 'dispersedly') {
			state.nodee = '负载均衡';
		}else if(n == 'intensively') {
			state.nodee = '集中分配';
		}
		console.log('n: ', n);
	},
	['markJ'] (state, j) {
		if(j == 'priority') {
			state.jobb = '优先级';
		}else if(j == 'fifo') {
			state.jobb = '先入先出';
		}
	},
	['receiveGetQueue'] (state, list) {
		for (var i = 0; i < list.length; i++) {
			state.queueList.push(list[i]);
		}
		
	},
	['receiveGetQueueList'] (state, obj) {
		state.selValue = obj.sel;
		if(obj.resp && obj.resp.nodeStrategy == 'dispersedly') {
			state.nodee = '负载均衡';
		}else if(obj.resp && obj.resp.nodeStrategy == 'intensively') {
			state.nodee = '集中分配';
		}
		if(obj.resp && obj.resp.jobStrategy == 'priority') {
			state.jobb = '优先级';
		}else if(obj.resp && obj.resp.jobStrategy == 'fifo') {
			state.jobb = '先入先出';
		}
		
		console.log('state.nodee: ', state.nodee);
		console.log('state.jobb: ', state.jobb);
		
	},
	['receiveCurrentVal'] (state, currentVal) {
		console.log('currentVal: ', currentVal);
		state.nodee = currentVal;
	},
	['receiveQueueList'] (state, listQueue) {
		state.quList = listQueue;
		
		
	},
	['receiveRunningList'] (state, listRunning) {
		
		// state.ruList = listRunning
		
		// 取差集
		let newAdd = listRunning.filter(x => state.ruList.every(y=>y.jobId !==x.jobId))
		let reduce = state.ruList.filter(x => listRunning.every(y=>y.jobId !==x.jobId))

		
		console.log('newAdd: ', newAdd);
		console.log('reduce: ', reduce);
		// 删除
		
		let object = {}

		for(let l = 0; l < reduce.length; l++) {
			object[reduce[l].jobId] = 1;
		}
		console.log('object: ', object);
		for(let k = state.ruList.length-1; k >= 0; k--) {
			if(object[state.ruList[k].jobId]) {
				state.ruList.splice(k, 1)
			}
		}
		
		
		if(newAdd.length > 0) {
			for(let m = 0; m < newAdd.length; m++){
				state.ruList.push(newAdd[m]);
			}
		}
		
		
	},
	['receiveOldSelValue'] (state, selValue) {
		state.oldSelValue = selValue;
	},
	['receiveOldSelValueq'] (state, selValue) {
		state.oldSelValueq = selValue;
	},
	['clearRuList'] (state) {
		state.ruList = []
	},
	['a'] (state) {
		state.a++;
		state.a2 += 2;
	}
}

const actions = {
	['getQueue'] (store) {
		const ex = "http://10.13.107.17:8083/";
		
		let resp = ["aux","batch","cfo","cfo_test","dpp","dps","prod_push","qcs","que_py","que_window","ubpack"]
		
		// console.log('resp: ', resp);
		
		store.commit('receiveGetQueue', resp)
	},
	['getQueueList'] (store, sel) {
		// store.state.selValue = sel;
		
		const ex = "http://10.13.107.17:8083/";
		
		let resp = null;
		let obj = {}
		if(sel == '计算资源池' || sel == 'que_window') {
			resp = { nodeStrategy: "intensively", jobStrategy: "fifo" }
		} else {
			resp = { nodeStrategy: "dispersedly", jobStrategy: "priority" }
		}
		obj.resp = resp;
		obj.sel = sel
		store.commit('receiveGetQueueList', obj)
	},
	['runningList'] (store) {
		const ex = "http://10.13.107.17:8083/" + state.selValue;
		const resp = [
			{ "jobId": "17", "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_1" },
			{ "jobId": "8"+state.a2, "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_2" },
			{ "jobId": "9"+state.a, "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_3" },
			{"jobId": state.a2, "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_3"},
			{"jobId": state.a, "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_3"}
		]
		console.log('state.oldSelValue: ', state.oldSelValue);
		console.log('state.selValue: ', state.selValue);
		if(state.oldSelValue != state.selValue) {
			store.commit('clearRuList');
		}
		store.commit('receiveRunningList', resp);
		store.commit('a');
		store.commit('receiveOldSelValue', state.selValue)
	},
	['queueList'] (store) {
		const resp = [
			{ "jobId": "test task" + state.a, "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_1" },
			{ "jobId": "test task", "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_1" },
			{ "jobId": "test task" + state.a2, "taskId": "Ins_hy1_czi_l2d_pro_20190125_080368_001_001_1" }
		]
		if(state.oldSelValueq == state.selValue) {
			store.commit('receiveQueueList', []);
		}
		store.commit('receiveQueueList', resp);
		store.commit('receiveOldSelValueq', state.selValue);
	}
	
}

const getters = {
	numberList: state => state.queueList, //队列编号 
	nodeSList: state => state.nodeS, // 分配
	jobSList: state => state.jobS, // 调度
	
	// node: state => state.nodee, // 分配 当前值
	// job: state => state.jobb, // 调度 当前值
	
	node: state => state, // 分配 当前值
	job: state => state ,// 调度 当前值
	
	qList: state => state.quList,
	rList: state => state.ruList,
	
	val: state => state.selValue
}

export default {
	state,
	mutations,
	actions,
	getters
}