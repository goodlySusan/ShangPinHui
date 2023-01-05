import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'
//home模块的小仓库
//state:仓库存储数据的地方
const state = {
	cartList:[]
}
//mutations:修改state的唯一手段
const mutations = {
	GETCARTLIST(state,cartList){
		state.cartList = cartList
	}
}
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
	//通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
	async getCartList({commit}){
		let result = await reqCartList()
		if(result.code==200){
			commit('GETCARTLIST',result.data)
		}
	},
	//删除某一个商品
	async deleteCartById({commit},skuId){
		let result = await reqDeleteCartById(skuId)
		if(result.code==200){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	//修改购物车某一个产品的选中状态
	async updateCheckedById({commit},{skuId,isChecked}){
		let result = await reqUpdateCheckedById(skuId,isChecked)
		if(result.code==200){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	//删除所有选中的商品
	async deleteAllCheckedCart({dispatch,getters}){
		//context:小仓库 commit(提交mutations修改state) getters(计算属性) dispatch(派发action) state(当前仓库数据)
		//获取购物车中全部的产品（是一个数组） 
		let PromiseAll = []
		getters.cartList.cartInfoList.forEach(item=>{
			let promise = item.isChecked==1?dispatch('deleteCartById',item.skuId):''
			//将每一次返回的Promise添加到数组中
			PromiseAll.push(promise)
		})
		//当PromiseAll中的每一个promise为真时，Promise.all(PromiseAll)才为true
		return Promise.all(PromiseAll)
	},
	//修改全部产品的选中状态
	updateAllCartIsChecked({dispatch,state},isChecked){
		let promiseAll = []
		state.cartList[0].cartInfoList.forEach(item=>{
			let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
			promiseAll.push(promise)
		})
		return Promise.all(promiseAll)
	}
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
	cartList(state){
		return state.cartList[0]||{}
	}
}

export default{
	state,
	mutations,
	actions,
	getters,
}