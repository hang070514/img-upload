import axios from 'axios'
const http = axios.create({
    baseURL: '/api',
    timeout: 30000,
    header: { 'X-Custom-Header': 'foobar'}
})
// 添加请求拦截
http.interceptors.request.use(function(config){
    return config
    },
    function (error){
        return Promise.reject(error)
    })

// 添加响应拦截
http.interceptors.response.use((res) => {
    return res
    },
    (error) => {
        return Promise.reject(error)
    })

export default http
