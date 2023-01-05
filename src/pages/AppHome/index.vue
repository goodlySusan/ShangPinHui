<template>
  <div>
	<!--三级联动全局组件，全局组件不需要引入-->
	<TypeNav></TypeNav>
	<ListContainer></ListContainer>
	<Recommend></Recommend>
	<Rank></Rank>
	<Like></Like>
	<Floor v-for="(floors,index) in floorsList" :key="floors.id" :list="floors"></Floor>
	<Brand></Brand>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from '@/pages/AppHome/ListContainer'
import Recommend from '@/pages/AppHome/Recommend'
import Rank from '@/pages/AppHome/Rank'
import Like from '@/pages/AppHome/Like'
import Floor from '@/pages/AppHome/Floor'
import Brand from '@/pages/AppHome/Brand'
import {mapState} from 'vuex'
export default {
  name: 'AppHome',
  data () {
    return {}
  },
  components:{
	  ListContainer,
	  Recommend,
	  Rank,
	  Like,
	  Floor,
	  Brand
  },
  mounted(){
  	//派发action,通过vuex发起ajax请求，将数据存储到仓库中
	//获取floor组件数据
  	this.$store.dispatch('getFloorsList')
  },
  computed:{
	  ...mapState({
		  floorsList:state=>state.home.floorsList
	  })
  }
}
</script>

<style lang="less" scoped>

</style>