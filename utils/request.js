import axios from 'axios'
// import { UniAdapter } from 'uniapp-axios-adapter';

const request = axios.create({
	baseURL: "http://127.0.0.1:8080",
	timeout: 6000,
	crossDomain: true,
})

export default request



// export default http;
// utils/request.js
// import Vue from 'vue'

// const request = (options) => {
//   // 可以在这里对请求进行一些统一的处理，例如添加token等
//   return new Promise((resolve, reject) => {
//     uni.request({
//       // ...options,
//       // success: (res) => {
//       //   // 可以在这里对返回结果进行统一处理，例如判断返回状态码等
//       //   resolve(res.data)
//       // },
//       // fail: (err) => {
//       //   reject(err)
//       // }
	  
//     })
//   })
// }


// export default request

// const baseUrl = "http://127.0.0.1:8080/";


// const baseUrl = 'http://localhost:8080'    //api的固定前部地址
// const request = (url,method,data) =>{
//     return new Promise((resolve,reject) =>{
//         uni.request({
//             url: baseUrl + url,//拼接请求路径
//             data: data,
//             method: method,
//             header: {
//                 'content-type': 'application/json',
//                 //token: uni.getStorageSync('token')!= null ? uni.getStorageSync('token'): ''//请求头发送token，可选
//             },
//             success: (res) => {
//                 resolve(res)
//             },
//             fail: (error) => {
//                 reject(error)
//             }
//         })
//     })
// }
 
// //暴露函数
// export default request