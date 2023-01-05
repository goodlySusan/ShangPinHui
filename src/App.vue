<template>
	<div id="">
		<AppHeader></AppHeader>
		<!--路由组件出口的地方-->
		<router-view></router-view>
		<!--在Home,Search显示的，在登录注册时隐藏-->
		<AppFooter v-show="$route.meta.show"></AppFooter>
	</div>
</template>

<script> 

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

export default {
  name: 'App',
  components: {
    AppHeader,
	AppFooter,
  },
  mounted(){
	//通知vuex发请求，获取数据，存储于仓库当中
	this.$store.dispatch('categoryList')
  }
}
</script>

<style scoped>

</style>
