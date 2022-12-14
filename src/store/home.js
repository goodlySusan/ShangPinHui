import {reqCategoryList,reqGetBannersList,reqGetFloorsList} from '@/api'
//home模块的小仓库
//state:仓库存储数据的地方
const state = {
	//三级菜单的数据
	categoryList:[],
	//轮播图数据
	bannersList:[],
	//floors数据
	floorsList:[]
}
//mutations:修改state的唯一手段
const mutations = {
	CATEGORYLIST(state,categoryList){
		state.categoryList = categoryList
	},
	GETBANNERSLIST(state,bannersList){
		state.bannersList = bannersList
	},
	GETFLOORSLIST(state,floorsList){
		state.floorsList = floorsList
	}
}
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
	//通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
	async categoryList({commit}) {
		let result = await reqCategoryList()
		if(result.code==200){//请求成功时
			commit("CATEGORYLIST",result.data)
		}
		//console.log(result)
	},
	//获取首页轮播图的数据
	async getBannersList({commit}){
		let result = await reqGetBannersList()
		if(result.code == 200){
			commit("GETBANNERSLIST",result.data)
		}
	},
	//获取首页floors轮播图的数据
	async getFloorsList({commit}){
		let result = await reqGetFloorsList()
		if(result.code == 200){
			commit("GETFLOORSLIST",result.data)
		}
	},
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default{
	state,
	mutations,
	actions,
	getters,
}