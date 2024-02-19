import axios from 'axios' // 使用前要先安装依赖：npm install axios

// 创建axios实例
const service = axios.create({ 
	// 这里可以放一下公用属性等。
	// baseUrl: 'https://xxxx', // 用于配置请求接口公用部分，请求时会自动拼接在你定义的url前面。
	// withCredentials: false, // 跨域请求时是否需要访问凭证
	// baseURL:"http://47.95.13.131:8081",
	timeout: 3 * 1000, // 请求超时时间
})
service.defaults.withCredentials = true; // 跨域请求时是否需要访问凭证
service.interceptors.request.use(config => {
	// 这里可以进行请求加密等操作。如添加token,cookie，修改数据传输格式等。
	console.log(window.localStorage.getItem('Token'));
	config.headers['Token'] = window.localStorage.getItem('Token');
	config.headers['Content-type'] = 'application/json';
	return config;
})
// export default service;

const http = {
	get(url, params, headers) {
		const config = {
			method: 'GET',
			url: url,
			params: params ? params : {},
			headers: headers ? headers : {}
		}
		return service(config);	
	},
	post(url, data, headers) {
		const config = {
			method: 'POST',
			url: url,
			data: data ? data : {},
			headers: headers ? headers : {}
		}
		return service(config);	
	}
}
console.log(111);
export default http



