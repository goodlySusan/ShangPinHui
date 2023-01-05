const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
	//打包时不会出现map文件
	productionSourceMap:false,
	//关闭eslint
	lintOnSave:false,
	//配置代理跨域
	devServer:{
		proxy:{
			"/api":{
				target:"http://gmall-h5-api.atguigu.cn"
			}
		}
	}
}
