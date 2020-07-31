import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getTokenSDP } from '@/utils/auth'

//自写
// axios.defaults.withCredentials = true //开启后服务器才能拿到cookie
// axios.defaults.crossDomain = true;//配置axios跨域
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'//配置默认请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'//配置默认请求头
// create an axios instance
const serviceSDP = axios.create({
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
  baseURL: process.env.VUE_APP_BASE_API_SDP, // url = base url + request url
  // baseURL: 'localhost:8088', // url = base url + request url
  timeout: 15000 // request timeout
})

// request interceptor
serviceSDP.interceptors.request.use(

  config => {
    console.log('request拦截')
    console.log(config)
    if (store.getters.tokenSDP) {
      config.headers['Authorization'] = getTokenSDP() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // do something before request is sent
    //
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
serviceSDP.interceptors.response.use(

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('response拦截')
    // const res = response.data
    console.log(response)
    const res = response
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
      if (res.status !== 200) {
        console.log(response+'afdsafasdfaasdfasdf')
      Message({
        message: res.data || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 201000001 || res.status === 10000006) {
        // to re-login
        store.dispatch('user/loginSDP').then(() => {
          location.reload()
        })
/*        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })*/
      }
      return Promise.reject(new Error(res.data || 'Error'))
    } else {
        console.log(res+'okok')
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.data,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default serviceSDP
