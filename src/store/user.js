//登录与注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
//state:仓库存储数据的地方
const state = {
	code:"",
	token:getToken(),
	userInfo:{} 
}
//mutations:修改state的唯一手段
const mutations = {
	GETCODE(state,code){
		state.code = code
	},
	USERLOGIN(state,token){
		state.token = token
	},
	GETUSERINFO(state,userInfo){
		state.userInfo = userInfo
	},
	CLEAR(state){
		state.token = ''
		state.userInfo = {}
		removeToken()
	}
}
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
	//获取验证码
	async getCode({commit},phone){
		let result = await reqGetCode(phone)
		if(result.code==200){
			commit("GETCODE",result.data)
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	//用户注册
	async userRegister({commit},user){
		let result = await reqUserRegister(user)
		if(result.code==200){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
    //登录业务
	async userLogin({commit},data){
		let result = await reqUserLogin(data)
		//服务器下发token,用户唯一标识符
		if(result.code == 200){
			//永户已经登录成功且获取到token
			commit("USERLOGIN",result.data.token)
			//持久化存储token
			setToken(result.data.token)
			return "ok"
		}else{
			return Promise.reject(new Error("faile"))
		}
	},
	//获取用户信息
	async getUserInfo({commit}){
		let result = await reqUserInfo()
		if(result.code == 200){
			commit('GETUSERINFO',result.data)
			return 'ok'
		}else{
			return Promise.reject(new Error("faile"))
		}
	},
	//退出登录
	async userLogout({commit}){
		let result = await reqLogout()
		if(result.code==200){
			commit('CLEAR')
			return 'ok'
		}else{
			return Promise.reject(new Error("faile"))
		}
	}
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default{
	state,
	mutations,
	actions,
	getters,
}