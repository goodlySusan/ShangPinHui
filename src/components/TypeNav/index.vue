<template>
	<!-- 商品分类导航 -->
	<div class="type-nav">
	    <div class="container">
	        <div @mouseleave="leaveShow" @mouseenter="enterShow">
				<h2 class="all">全部商品分类</h2>
				<!--过度动画-->
				<transition name="sort">
					<div class="sort" v-show="show">
					    <div class="all-sort-list2" @click="goSearch">
					        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
					            <h3 @mouseenter="changeIndex(index)">
					                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
					            </h3>
					            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
					                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
					                    <dl class="fore">
					                        <dt>
					                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
					                        </dt>
					                        <dd>
					                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
					                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
					                            </em>
					                        </dd>
					                    </dl>
					                </div>
					            </div>
					        </div>
					    </div>
					</div>
				</transition>
	        </div>
	        <nav class="nav">
	            <a href="###">服装城</a>
	            <a href="###">美妆馆</a>
	            <a href="###">尚品汇超市</a>
	            <a href="###">全球购</a>
	            <a href="###">闪购</a>
	            <a href="###">团购</a>
	            <a href="###">有趣</a>
	            <a href="###">秒杀</a>
	        </nav>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	//把lodash全部功能函数引入
	//import _ from 'lodash'
	//最好的引入方式，按需加载,因为throttle默认暴露，所以不用写{}
	import throttle from 'lodash/throttle'
	export default {
		name:'TypeNav',
		data(){
			return{
				//存储用户鼠标移上哪一个一级分类
				currentIndex:-1,
				show:true
			}
		},
		//组件挂载完毕，可以向服务器发请求
		mounted(){
			//当组件挂载完毕，让show属性变为false
			//如果不是Home路由组件，将TypeNav进行隐藏
			if(this.$route.path!='/home'){
				this.show = false
			}
		},
		computed:{
			...mapState({
				categoryList:(state)=>{
					return state.home.categoryList
				}
			})
		},
		methods:{
			//鼠标进入修改currentIndex的属性
			changeIndex:throttle(function(index){//节流函数
				this.currentIndex = index
			},50),
			leaveShow(){//鼠标移除,商品分类列表进行隐藏
			    this.currentIndex = -1
			    if(this.$route.path!='/home'){
					this.show = false
				}
			},
			enterShow(){//鼠标移入，商品分类列表进行展示
				this.show = true
			},
			//进行路由跳转的方法
			goSearch(event){
				//最好的解决方案：编程式导航+事件委派
				let element = event.target //event是被点击的节点
				//节点有一个属性dataset,可以获取节点的自定义属性和属性值
				let {categoryname,category1id,category2id,category3id} = element.dataset
				//如果标签身上有categoryname一定是a标签
				if(categoryname){
					let location = {name:'search'}
					let query = {categoryName:categoryname}
					if(category1id){
						query.category1Id = category1id
					}else if(category2id){
						query.category2Id = category2id
					}else{
						query.category3Id = category3id
					}
					location.query = query
					//路由跳转
					if(this.$route.params){
						location.params = this.$route.params
						this.$router.push(location)
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.type-nav {
	    border-bottom: 2px solid #e1251b;
	
	    .container {
	        width: 1200px;
	        margin: 0 auto;
	        display: flex;
	        position: relative;
	
	        .all { 
	            width: 210px;
	            height: 45px;
	            background-color: #e1251b;
	            line-height: 45px;
	            text-align: center;
	            color: #fff;
	            font-size: 14px;
	            font-weight: bold;
	        }
	
	        .nav {
	            a {
	                height: 45px;
	                margin: 0 22px;
	                line-height: 45px;
	                font-size: 16px;
	                color: #333;
	            }
	        }
	
	        .sort {
	            position: absolute;
	            left: 0;
	            top: 45px;
	            width: 210px;
	            height: 461px;
	            position: absolute;
	            background: #fafafa;
	            z-index: 999;
	
	            .all-sort-list2 {
	                .item {
	                    h3 {
	                        line-height: 30px;
	                        font-size: 14px;
	                        font-weight: 400;
	                        overflow: hidden;
	                        padding: 0 20px;
	                        margin: 0;
	
	                        a {
	                            color: #333;
	                        }
	                    }
	
	                    .item-list {
	                        display: none;
	                        position: absolute;
	                        width: 734px;
	                        min-height: 460px;
	                        background: #f7f7f7;
	                        left: 210px;
	                        border: 1px solid #ddd;
	                        top: 0;
	                        z-index: 9999 !important;
	
	                        .subitem {
	                            float: left;
	                            width: 650px;
	                            padding: 0 4px 0 8px;
	
	                            dl {
	                                border-top: 1px solid #eee;
	                                padding: 6px 0;
	                                overflow: hidden;
	                                zoom: 1;
	
	                                &.fore {
	                                    border-top: 0;
	                                }
	
	                                dt {
	                                    float: left;
	                                    width: 54px;
	                                    line-height: 22px;
	                                    text-align: right;
	                                    padding: 3px 6px 0 0;
	                                    font-weight: 700;
	                                }
	
	                                dd {
	                                    float: left;
	                                    width: 415px;
	                                    padding: 3px 0 0;
	                                    overflow: hidden;
	
	                                    em {
	                                        float: left;
	                                        height: 14px;
	                                        line-height: 14px;
	                                        padding: 0 8px;
	                                        margin-top: 5px;
	                                        border-left: 1px solid #ccc;
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
					.cur {
						background-color: skyblue;
					}
	            }
	        }
			//过渡动画的样式
			//过渡动画开始状态
			.sort-enter{
				height: 0px;
			}
			//过渡动画结束状态
			.sort-enter-to{
				height: 461px;
			}
			//定义动画的时间，速率
			.sort-enter-active{
				transition: all 0.15s linear;
			}
	    }
	}
	
</style>
