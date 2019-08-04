import drHome from '@/views/drHome/drHome'
import Drplan from '@/views/drplan/Drplan'
import SubDrplan from '@/views/linkdrplan/subDrplan'
import Sub2 from '@/views/drplan/sub2/Sub2'
import Sub3 from '@/views/drplan/sub3/Sub3'

const drRouter = { 
				path: '/Drplan', 
				name: '接收计划', 
				component: drHome,
				redirect: '/Drplan',
				children: [
					{ 
						path: '/', 
						component: Drplan,
						redirect: '/Drplan',
						meta: { title: 'Drplan' },
						children: [
							{
								path: 'subDrplan/:drplanId', 
								name: 'SubDrplan', 
								component: drHome,
								redirect: '/Drplan/subDrplan',
								meta: { title: 'SubDrplan' }/* ,
								children: [
									{ 
										path: 'subDrplan', 
										redirect: '/Drplan/subDrplan',
										component: SubDrplan,
										children: [
											{
												path: 'Sub2', 
												name: 'Sub2', 
												component: drHome,
												redirect: '/Drplan/subDrplan/Sub2',
												meta: { title: 'Sub2' },
												children: [
													{ 
														path: 'Sub2', 
														component: Sub2,
														children: [
															{
																path: 'Sub3', 
																name: 'Sub3', 
																redirect: '/Drplan/subDrplan/Sub2/Sub3',
																component: Sub3,
																meta: { title: 'Sub3' }
															}
														]
													}
												]
											}
										]
									} 
								]*/
							}
						]
					}
				]
			}

export default drRouter