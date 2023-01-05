import {reqAddressInfo,reqOrderInfo} from '@/api'
//home模块的小仓库
//state:仓库存储数据的地方
const state = {
	userAddress:[],
	orderInfo:{}
}
//mutations:修改state的唯一手段
const mutations = {
	USERADDRESS(state,userAddress){
		state.userAddress = userAddress
	},
	ORDERINFO(state,orderInfo){
		state.orderInfo = orderInfo
	}
}
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
	//通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
	//获取用户地址信息
	async getUserAddress({commit}){
		let result = await reqAddressInfo()
		if(result.code == 200){
			commit('USERADDRESS',result.data)
		}else{
			
		}
	},
	//获取商品清单数据
	async getOrderInfo({commit}){
		let result = await reqOrderInfo()
		if(result.code == 200){
			commit('ORDERINFO',result.data)
		}else{
			
		}
	}
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
	
}

export default{
	state,
	mutations,
	actions,
	getters,
}