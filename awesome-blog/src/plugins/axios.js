import Vue from "vue";
import axios from 'axios';
import router from '../router'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;


// axios.interceptors.response.use(function (response) {
//     return response
//   }, function (error) {
//     console.log(error.response)
//     if (error.response.status === 401) {
//         window.localStorage.removeItem('userinfo');
//         window.localStorage.setItem("401", true);
//         router.push("/auth/login");
//         console.log('로그아웃을 해야겠는걸요?');
//     } else if (error.response.status === 500) {
//         router.push("/error/server");
//     }
//     return Promise.reject(error)
//   })

Vue.prototype.$http = axios;
