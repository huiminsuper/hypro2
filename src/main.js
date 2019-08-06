// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import layer from 'vue-layer'
import './api/directives.js'

import Cesium from 'cesium/Cesium'
import widgets from 'cesium/Widgets/widgets.css'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue)
Vue.prototype.Cesium = Cesium
Vue.prototype.widgets = widgets 

const router = new VueRouter({
	// mode: 'history',
	routes
})

let routeList = []
router.beforeEach((to, from, next) => {
	let index = -1
	for (let i = 0; i < routeList.length; i++) {
		if (routeList[i].name === to.name) {  // 如果下一个路由数组中存在，记录index
			index = i
			break
		}
	}
	if (index !== -1) { // 下一个路由存在删除数组此下标之后的数组元素
		routeList.splice(index + 1, routeList.length - index - 1)
	} else if (to.name !== 'Drplan') { // 下一个路由不存在且不是首页路由就将下一个路由添加到数组中
		routeList.push({ 'name': to.name, 'path': to.fullPath })
	} else if (to.name === 'Drplan') { // 如果是首页路由将数组清空
		routeList = []
	}
	to.meta.routeList = routeList
	next()
})

/* eslint-disable no-new */
new Vue({
	// el: '#app',
	router,
	store, // 使用 vuex
	// components: { App },
	// template: '<App/>'
	render: h => h(App)
}).$mount('#app')
