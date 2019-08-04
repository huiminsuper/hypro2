// 初始化数据
const state = {
	shop_list: [
		{ id: 11, name: '鱼香肉丝', price: 12 },
		{ id: 22, name: '宫保鸡丁', price: 14 },
		{ id: 34, name: '土豆丝', price: 10 },
		{ id: 47, name: '米饭', price: 2 }
	],
	// 添加到购物车的商品（已选商品）
	added: []
};

// getter 抛出去的数据
const getters = {
	// 商品列表
	shoplist: state => state.shop_list,
	// 购物车列表
	carProducts: state => {
		return state.added.map(({id, num}) => { // 在 actions 中只有 id 和 num 的字段
			// 从原始数据上面进行筛选，这里通过 id 来匹配
			let product  = state.shop_list.find(n => n.id == id)
			// console.info('product:', product)
			return {
				...product,
				num
			}
		})
	},
	// 计算总价
	totalPrice (state, getters) { // getter 中可以调用 getter 里面的方法(官网文档)
		/* console.log(state);
		console.log(getters.carProducts);
		console.log(this); */
		let total = 0;
		getters.carProducts.forEach(item => {
			total += item.price * item.num // (累加 单价 * 数量)
		})
		return total;
	},
	// 计算总数
	totalNum (state, getters) {
		let total = 0;
		getters.carProducts.forEach(item => {
			total += item.num;
		})
		return total;
	}
	
	
	/* state => state.shop_list
	==
	(state) => {
		return state.shop_list,
	}
	==
	function (state) {
		return state.shop_list,
	} */
	
};

// action 异步的操作
const actions = {
	// 添加到购物车操作
	addToCart({commit}, product) {
		// console.log('product:' + JSON.stringify(product)) addToCart 函数传过来的当前 item(即 scope.row)
		commit('add',{ // 传递一个 add 方法， 携带一个参数 id
			id: product.id,
// 			name: product.name,
// 			price: product.price
		})
	},
	// 删除某个商品
	deleteItem ({commit}, product) {
		commit('delItem', {
			id: product.id
		});
	},
	// 清空购物车
	clearAllCart({commit}) {
		commit('clearAll')
	}
};

// mutation
const mutations = {
	// 添加到购物车操作
	add(state, {id}) { // 解构 id 和 {id}的区别
		let record = state.added.find(n => n.id == id) // 找到数组中
		if(!record) {
			state.added.push({
				id,
				num: 1
			})
		}else {
			record.num++
		}
	},
	delItem (state, {id}) {
		console.log(id)
		state.added.forEach((item, index) => {
			if(item.id === id){
				state.added.splice(index, 1)
			}
		})
	},
	clearAll(state) {
		state.added = []
	}
};

export default {
	state,
	mutations,
	actions,
	getters
}