//import AppHome from '@/pages/AppHome'
//import AppSearch from '@/pages/AppSearch'
//import AppRegister from '@/pages/AppRegister'
//import AppLogin from '@/pages/AppLogin'
//import AppDetail from '@/pages/AppDetail'
//import AddCartSuccess from '@/pages/AddCartSuccess'
//import ShopCart from '@/pages/ShopCart'
//import AppTrade from '@/pages/AppTrade'
//import AppPay from '@/pages/AppPay'
//import PaySuccess from '@/pages/PaySuccess'
//import AppCenter from '@/pages/AppCenter'
//引入二级路由组件
import MyOrder from '@/pages/AppCenter/MyOrder'
import GroupOrder from '@/pages/AppCenter/GroupOrder'
//路由配置信息
//当打包构建应用时，JavaScript包会变得非常大，影响页面加载，
//如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候再加载对应组件，这样就更加高效了
//路由懒加载，箭头函数返回Promise
export default [
	{
		path: '/home',
		component: ()=>import('@/pages/AppHome'),
		meta: {
			show: true
		}
	},

	{
		path: '/search/:keyword?',
		component: ()=>import('@/pages/AppSearch'),
		meta: {
			show: true
		},
		name: "search",
		//路由组件能不能传递props数据
		//布尔值写法:params
		//props:true
		//对象写法：额外的给路由组件传递一些props
		//props:{a:1,b:2}
		//函数写法：可以params参数，query参数，通过props传递给路由组件
		props: ($route) => {
			return {
				keyword: $route.params.keyword,
				k: $route.query.k
			}
		}
	},

	{
		path: '/login',
		component: ()=>import('@/pages/AppLogin'),
		meta: {
			show: false
		}
	},

	{
		path: '/register',
		component: ()=>import('@/pages/AppRegister'),
		meta: {
			show: false
		}
	},

	{
		path: '/',
		redirect: "/home"
	},

	{
		path: '/detail/:skuId',
		component: ()=>import('@/pages/AppDetail'),
		meta: {
			show: true
		}
	},
	
	{
		path:'/addcartsuccess',
		name:'addcartsuccess',
		component:()=>import('@/pages/AddCartSuccess'),
		meta:{
			show:true
		}
	},
	
	{
		path:'/shopcart',
		component:()=>import('@/pages/ShopCart'),
		meta:{
			show:true
		}
	},
	
	{
		path:'/trade',
		component:()=>import('@/pages/AppTrade'),
		meta:{
			show:true
		},
		beforeEnter:(to,from,next)=>{
			//去交易页面，必须是从购物车而来
			if(from.path == '/shopcart'){
				next()
			}else{
				//中断当前的导航，如果浏览器的url改变了，那么url地址会重置到from路由对应的地址
				next(false)
			}
		}
	},
	
	{
		path:'/pay',
		component:()=>import('@/pages/AppPay'),
		meta:{
			show:true
		},
		beforeEnter:(to,from,next)=>{
			//去支付页面，必须是从交易页面而来
			if(from.path == '/trade'){
				next()
			}else{
				//中断当前的导航，如果浏览器的url改变了，那么url地址会重置到from路由对应的地址
				next(false)
			}
		}
	},
	
	{
		path:'/paysuccess',
		component:()=>import('@/pages/PaySuccess'),
		meta:{
			show:true
		},
		beforeEnter:(to,from,next)=>{
			//去支付成功页面，必须是从交易页面而来
			if(from.path == '/pay'){
				next()
			}else{
				//中断当前的导航，如果浏览器的url改变了，那么url地址会重置到from路由对应的地址
				next(false)
			}
		}
	},
	
	{
		path:'/center',
		component:()=>import('@/pages/AppCenter'),
		meta:{
			show:true
		},
		//二级路由组件
		children:[
			{
				path:'myorder',
				component:MyOrder,
			},
			{
				path:'grouporder',
				component:GroupOrder,
			},
			{
				path:'/center',
				redirect:'/center/myorder'
			}
		]
	}
]

