import {reqGetGoodInfo,reqAddOrUpdateShopCart} from '@/api'
//封装游客身份模块uuid，生成一个随机字符串
import {getUUID} from '@/utils/uuid_token.js'
//home模块的小仓库
//state:仓库存储数据的地方
const state = {
	goodInfo:{},
	uuid_token:getUUID()
}
//mutations:修改state的唯一手段
const mutations = {
	GETGOODINFO(state,goodInfo){
		state.goodInfo = goodInfo
	}
}
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
	//通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
	//获取产品信息的action
	async getGoodInfo({commit},skuId){
		let result = await reqGetGoodInfo(skuId)
		if(result.code==200){
			commit('GETGOODINFO',result.data)
		}
	},
	//将产品添加到购物车中
	async addOrUpdateShopCart({commit},{skuId,skuNum}){
		//服务器写入数据成功，只是返回code==200，没有返回其余数据
		let result = await reqAddOrUpdateShopCart(skuId,skuNum)
		//当前函数执行后返回Promise
		if(result.code==200){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	}
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
	//路径导航简化的数据
	categoryView(state){
		return state.goodInfo.categoryView||{}
	},
	//产品信息的数据
	skuInfo(state){
		return state.goodInfo.skuInfo||{}
	},
	//售卖属性的数据
	spuSaleAttrList(state){
		return state.goodInfo.spuSaleAttrList||[]
	}
}

export default{
	state,
	mutations,
	actions,
	getters,
}