import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import cart from './modules/cart'
import control from './modules/control'

Vue.use(Vuex)

const state = {
	count: 0
}

/* const increment = ({commit}) => { // actions
	commit('INCREMENT')
}

const decrement = ({commit}) => { // actions
	commit('DECREMENT')
}

const getCount = state => { // getters
	return state.count
} */

// 定义所需的 mutations
const mutations = {
	INCREMENT (state) {
		state.count++
	},
	DECREMENT (state) {
		state.count--
	}
}

export default new Vuex.Store({
	modules:{ // 和文件名字对应
		cart,
		control
	},
	strict: process.env.NODE_ENV !== 'production', // 严格模式
	/* increment,
	decrement,
	getCount, */
	actions,
	getters,
	state,
	mutations
})
