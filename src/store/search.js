//search模块的小仓库
import {reqGetSearchInfo} from '@/api'
//state:仓库存储数据的地方
const state = {
	searchinfo:{}
}
//mutations:修改state的唯一手段
const mutations = {
	GETSEARCHINFO(state,searchinfo){
		state.searchinfo=searchinfo
	}
}
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
	async getSearchInfo({commit},params={}){
		let result = await reqGetSearchInfo(params)
		if(result.code == 200){
			commit('GETSEARCHINFO',result.data)
		}else{
			return Promise.reject(new Error('faile'))
		}
	}
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
	goodsList(state){
		//属性值至少是一个数组
		return state.searchinfo.goodsList||[]
	},
	trademarkList(state){
		return state.searchinfo.trademarkList||[]
	},
	attrsList(state){
		return state.searchinfo.attrsList||[]
	},
}

export default{
	state,
	mutations,
	actions,
	getters,
}