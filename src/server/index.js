import http from "./until";
console.log(http);
export function adminlogin(data,headers){
	return http.post('api/login', data, headers)
}

export function gethealthlist(data,headers){
	return http.get('/api/getRouters', data, headers)
}

export function getTreeselect(data,headers){
	return http.get('/api/system/dept/list',data,headers)
}

export function addDept(data,headers){
	return http.post('/api/system/dept',data,headers)
}


export function doctorlist(data,headers){
	// http.get('/api​/business​/Doctorevaluate​/list',data,headers).then(res=>console.log(res))
	return http.get('/api/business/Doctorevaluate/list',data,headers)
}

export function adddoctor(data,headers){
	return http.post('/api/business/Member',data,headers)
}