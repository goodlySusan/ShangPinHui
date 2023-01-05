//引入mockjs模块
import Mock from 'mockjs'
//把JSON数据格式引入进来
//webpack默认对外暴露的：图片，JSON
import banners from './banners.json'
import floors from './floors.json'
//mock数据：第一个参数：请求地址，第二个参数：请求数据
Mock.mock("/mock/banners",{code:200,data:banners})//模拟首页轮播图数据
Mock.mock("/mock/floors",{code:200,data:floors})
