import HelloWorld from '@/views/HelloWorld'
import Tdp from '@/views/tdplan/Tdp'
// import Sub from '@/views/subplan/Sub'
import Pro from '@/views/proplan/Pro'
// import Linksub from '@/views/linksub/Linksub'
// import Linkpro from '@/views/linkpro/Linkpro'
import Home from '@/Home'
import SelectChose from '@/views/SelectChose'
import Drplan from '@/views/drplan/Drplan'
import Test from '@/views/Test'
import drHome from '@/views/drHome/drHome'
import SubDrplan from '@/views/linkdrplan/subDrplan'
import Sub2 from '@/views/sub2/Sub2'
import Sub3 from '@/views/sub3/Sub3'
import Sub4 from '@/views/sub4/Sub4'
import Flowchart from '@/views/charts/flowchart'
import Line from '@/views/charts/line'
import Car from '@/views/car/car'
import Promise from '@/views/promise/Promise'
import XmlToJson from '@/views/xmlToJson/xmlToJson'
import Mysql from '@/views/mysql/mysql'
import ProDemo from '@/views/promiseDemo/proDemo'
import vTable from '@/views/vue_d/vTable'

import Layout from '@/views/self/layout'
import Monitor from '@/views/self/monitor'
import Node from '@/views/self/node'
import g6 from '@/views/g6'
import OnlyReadG6 from '@/views/onlyReadG6'
import Cesium from '@/views/map/cesium'

let routes = [
	/* {
		path: '/',
		component: Home,
		children: [
			{
				path: '/',
				component: Tdp
			}
		]
	}, */
	{
		path: '/',
		name: '',
		component: Home,
		hidden: true,
		children: [
			{ path: '/', name: 'dtPlan', tabName: '数传计划', component: Tdp },
			{ path: '/Pro', name: '产品生产', tabName: '产品生产', component: Pro },
			{ 
				path: '/Drplan',
				tabName: '接收计划', 
				component: drHome,
				redirect: '/Drplan',
				children: [
					{ 
						path: '/Drplan', 
						component: Drplan,
						name: 'Drplan'/* ,
						meta: { title: 'Drplan' } */
					},
					{
						path: '/subDrplan/:drplanId', 
						name: 'SubDrplan',
						component: SubDrplan,
						meta: { title: 'SubDrplan' }
					},
					{
						path: '/Sub2', 
						name: 'Sub2', 
						component: Sub2,
						meta: { title: 'Sub2' }
					},
					{
						path: '/Sub3', 
						name: 'Sub3', 
						component: Sub3,
						meta: { title: 'Sub3' }
					},
					{
						path: '/Sub4', 
						name: 'Sub4', 
						component: Sub4,
						meta: { title: 'Sub4' }
					}
				]
			},
			{ path: '/SelectChose', name: 'SelectChose', tabName: 'SelectChose', component: SelectChose },
			// { path: '/Test', name: 'Test Vuex', tabName: 'Test Vuex', component: Test },
			{ path: '/Flowchart', name: 'Flowchart', tabName: '流程视图', component: Flowchart },
			{ path: '/Line', name: 'line', tabName: 'lineChart', component: Line },
			{ path: '/car', name: 'car', tabName: 'Shop Car', component: Car },
			{ path: '/promise', name: 'promise', tabName: 'Promise', component: Promise },
				{ path: '/promiseDemo', name: 'proDemo', tabName: 'PromiseDemo', component: ProDemo },
			{ path: '/xmlToJson', name: 'xmlToJson', tabName: 'xmlToJson', component: XmlToJson },
			{ path: '/mysql', name: 'mysql', tabName: 'mysql', component: Mysql },
			{ 
				path: '/layout', 
				name: 'layout', 
				tabName: '监控', 
				component: Layout,
				redirect: '/layout/monitor',
				children: [
					{ path: '/layout/monitor', name: 'monitor', subName: '状态和曲线', component: Monitor },
					{ path: '/layout/node', name: 'node', subName: '查看节点', component: Node }
				]
			},
			{path: '/readOnlyG6', name: 'readOnlyG6', tabName: 'readOnlyG6', component: OnlyReadG6},
			{path: '/cesium', name: 'cesium', tabName: 'cesium', component: Cesium}
			/* { path: '/vTable', name: 'vTable', tabName: 'vTable', component: vTable } */
			
			/* ,
			{ path: 'Linksub', name: 'Linksub', component: Linksub },
			{ path: 'Linkpro', name: 'Linkpro', component: Linkpro },
			{ path: 'Sub', name: 'Sub', component: Sub } */
		]
	},
	{
		path: '/',
		name: 'g6',
		component: g6
	}
]

export default routes
