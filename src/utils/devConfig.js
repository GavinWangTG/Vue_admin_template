
const debug = process.env.NODE_ENV !== 'production'
const config = {
    dev: 'https://api-test.xinglanhui.zhonghuixz.com/',
	public: 'https://api-test.xinglanhui.zhonghuixz.com/',
}

export const environment = {
    baseURL : debug ? config.dev : config.public,   // API root。被调用： http.js
    isOnline: debug ? false : true,        // 判断是线上环境还是开发环境。被调用：whole-layout.vue, login.vue
    version: 'v0.0.1'
}