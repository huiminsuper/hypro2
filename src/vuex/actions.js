export const increment = ({commit}) => { 
	commit('INCREMENT')
}

/* // 上面相当于
const increment = ({context}) => { 
	context.commit('INCREMENT')
}
// 相当于
const increment = ({commit:context.commit}) => { 
	context.commit('INCREMENT')
} */

export const decrement = ({commit}) => {
	commit('DECREMENT')
}
