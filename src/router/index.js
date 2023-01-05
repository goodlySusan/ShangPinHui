import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// 声明使用插件
Vue.use(VueRouter)

//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重新push|replace
//第一个参数：告诉原来push方法，往哪里跳转，传递哪些参数
VueRouter.prototype.push = function(location, resolve, reject) {
	if (resolve && reject) {
		//call和apply相同点：都可以调用函数一次，都可以篡改函数的上下文一次
		//不同点：call传递参数用逗号隔开，apply方法执行，传递数组
		originPush.call(this, location, resolve, reject)
	} else {
		originPush.call(this, location, () => {}, () => {})
	}
}
VueRouter.prototype.replace = function(location, resolve, reject) {
	if (resolve && reject) {
		originReplace.call(this, location, resolve, reject)
	} else {
		originReplace.call(this, location, () => {}, () => {})
	}
}
/* 
所有静态路由配置的数组
*/
let router = new VueRouter({
	//配置路由,kv一致，省略v
	routes,
	//滚动行为
	scrollBehavior(to,from,savedPosition){
		//返回y=0表示滚动条在最上方
		return {y:0}
	}
})
//全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
	let token  = store.state.user.token
	let name = store.state.user.userInfo.name
	next()
	if(token){
		//已经登录，去的是login,停留在首页
		if(to.path=='/login'){
			next('/home')
		}else{
			//已经登录，去的不是login
			//如果用户名已有
			if(name){
				next()
			}else{
				//没有用户信息，派发action让仓库存储用户信息再跳转
				try{
					//获取用户信息展示
					await store.dispatch('getUserInfo')
					next()
				}catch(error){
					await store.dispatch('userLogout')
					next('/login')
					//TODO handle the exception
				}
			}
		}
	}else{
		//未登录，不能去交易相关，支付相关，个人中心，要跳去登录页
		let toPath = to.path
		if(toPath.indexOf('/trade')!==-1||toPath.indexOf('/pay')!==-1||toPath.indexOf('/center')!==-1){
			next('/login?redirect='+toPath)
		}else{
			next()
		}
	}
})

export default router
// 向外默认暴露路由器对象
//export default new VueRouter({
//  mode: 'history', // 没有#的模式
//  routes, // 注册所有路由
//})
