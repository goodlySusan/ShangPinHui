# app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 路由的跳转
  路由的跳转有两种形式：
  声明式导航router-link,可以进行路由的跳转
  编程式导航push|replace,可以进行路由跳转
  编程式导航：声明式导航能做的，编程式导航都能做，
  编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑
  
#Footer组件的显示与隐藏
  Footer组件：在Home,Search显示Footer组件，在登录注册时隐藏
  1.可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏
  2.配置路由的时候，可以给路由添加路由元信息[meta],路由需要配置对象，他的key不能乱写
  
#路由传参
  1.路由跳转有几种方式
  比如A->B
  声明式导航router-link(务必要有to属性),可以进行路由的跳转
  编程式导航利用的是$router.push|replace,可以进行路由的跳转，可以书写一些自己的业务
  2.路由传参，参数有几种写法？
  params参数，属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
  query参数，不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&k=v,不需要占位
  
#home模块组件拆分
  先把静态页面完成
  拆分出静态组件
  获取服务器的数据进行展示
  动态业务
  
#全局组件只需要注册一次，就可以在项目任意地方使用

#axios二次封装
  为什么需要进行二次封装axios?
  请求拦截器，响应拦截器：请求拦截器可以在发请求之前处理一些业务，响应拦截器：当服务器返回以后，可以处理一些事情
  
#在项目中经常用API文件夹[axios] 
  接口当中，路径都带有/api
  baseURL:"/api"
  
#接口统一管理
  项目很小：完全可以在组件的生命周期函数中发请求
  项目大：axios.get('xxx')
  
#跨域问题
  什么是跨域：协议，域名，端口号不同请求，称之为跨域
  http://localhost:8080/#/home ----前端项目本地服务器
  http://product/getBaseCategoryList  ----后台服务器
  JSONP,CROS,代理
  
#vuex状态管理库
  1、vuex是什么？
  vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据
  2.vuex基本使用
  
#卡顿现象
  事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而且函数内部有计算，那么很可能出现浏览器卡顿）
  
#函数的节流与防抖
  1.节流
  在规定的时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
  2.防抖
  前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次
  
#三级联动组件的路由跳转与传递参数
  三级联动用户可以点击的：一级分类、二级分类、三级分类，当点击的时候，Home模块跳转到Search模块
  一级会把用户选中的产品（产品的名字，产品的ID）,在路由跳转的时候，进行传递
  
#mock数据：如果想mock(模拟)数据，需要用到一个插件mockjs
  使用步骤：
  1.在项目当中src文件夹中创建mock文件夹
  2.准备JSON数据(mock文件夹中创建响应的JSON文件)
  3.把mock数据需要的图片放置到public文件夹中[public文件夹在打包的时候，会把响应的资源原封不动打包到dist文件夹中]
  4.创建mockServe.js通过mockjs插件实现模拟数据
  5.mockServe.js文件在入口文件中引入(至少需要执行一次，才能模拟数据)
  
#ListContainer组件开发重点
  swiper插件:经常制作轮播图
  第一步，引入相应的依赖包
  第二步，页面中的结构一定要有
  第三步，初始化swiper实例，给轮播图添加动态效果
  
#组件通信的方式有？
  props：用于父子组件通信
  自定义事件：@on @emit 实现子给父通信
  全局事件总线：$bus 全能
  pubsub-js:vue当中几乎不用，全能
  插槽
  vuex