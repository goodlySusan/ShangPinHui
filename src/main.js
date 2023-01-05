import Vue from 'vue'
import App from './App.vue'
//引入仓库
import store from '@/store'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
import PagiNation from '@/components/PagiNation'
Vue.component(PagiNation.name,PagiNation)
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name,Button)
import gif from '@/assets/1.gif'
//element-ui注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'
//引入MockServe.js
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一引入api文件夹里面全部请求函数
import * as API from '@/api'
//引入插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
	//懒加载默认图片
	loading:gif
})
//引入表单校验插件
import '@/plugins/validate'
Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	//全局事件总线$bus配置 this是vm
	beforeCreate() {
		Vue.prototype.$bus = this
		Vue.prototype.$API = API
	},
	//注册路由:底下的写法kv一致省略v[router小写的]
	router,
	//注册仓库：组件实例的身上会多一个属性$store属性
	store
}).$mount('#app')
