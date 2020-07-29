import axios from 'axios'
import ELEMENT from 'element-ui'
import Cookies from 'js-cookie'

if (window) {
  window.__SDP_ENV = window.__SDP_ENV || 'pre-product'
}
// 预发布环境请求实例
const appConfig = {
  baseURL: 'https://sdp-pre.shijicloud.com/opensource/sdp/',
}
let Message = ELEMENT.Message
const REQUEST_SUCCESS = 200
const LANG = 'zh'
let refreshed = false
const STATUS_CODE = {
  code_06: 10000006, // 用户未登陆或token已失效
  code_07: 201000001, // 跳转登录页面
  code_11: 220000011, // 连续X次输入错误帐号将被锁定登录
  code_12: 220000012, // 您的账号已被锁定，请联系管理员进行解锁
  code_13: 220000013, // 初始密码设置参数未定义，请联系管理员进行设置
  code_14: 220000014, // 参数设置失败
  code_15: 220000015, // 初次登录，请重新设置密码
  code_16: 220000016, // 密码过期，请重新设置密码
  code_17: 202000054, // 您的账号异常，请联系管理员
  code_18: 202000055, // 您的账号已在其他设备上登录，请重新登录！
  code_19: 220000171 // 您的账号已被管理修改，请重置密码！
}

const appService = axios.create(appConfig)
appService.interceptors.response.use(responseSuccessFuc, responseErrFunc)
appService.interceptors.request.use(requestSuccessFunc, requestErrFunc)

function requestSuccessFunc(config) {
  // 在发送请求之前做些什么
  // config.headers['Authorization'] = sessionStorage.getItem('sdpToken') || '' // 让每个请求携带token--['Authorization']
  config.headers['Authorization'] = Cookies.get('USERSDP-Token') || '' // 让每个请求携带token--['Authorization']
  config.headers['Accept-Language'] = LANG
  return config
}
function responseSuccessFuc(response) {
  const res = response.data
  // 对状态码 进行判断
  let statusFlag = null
  const startStatus4 = String(res.status).substr(0, 4)
  const startStatus1 = String(res.status).substr(0, 1)
  statusFlag = statusError(response.data.status)
  if (statusFlag === false) {
    _Message({
      message: response.data.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(response.data)
  } else if (statusFlag === true && startStatus4.length > 3) {
    if (
      response.status === REQUEST_SUCCESS &&
      res.type === 'application/octet-stream'
    ) {
      return response.data
    }
    // 处理后台的状态码,区别于浏览器状态码，后台的状态码都是4位数及以上的。
    switch (startStatus1) {
      // 1开头的是消息提示
      case '1':
        _Message({
          message: response.data.message,
          duration: 3 * 1000
        })
        break
      // 2开头的是警告提示
      case '2':
        _Message({
          message: response.data.message,
          type: 'warning',
          duration: 3 * 1000
        })
        break
      // 3开头的是错误提示
      case '3':
        _Message({
          message: response.data.message,
          type: 'error',
          duration: 3 * 1000
        })
        break
      // 其他情况暂时统一处理成警告提示
      default:
        _Message({
          message: response.data.message,
          type: 'warning',
          duration: 3 * 1000
        })
    }
    return Promise.reject(response.data)
  }
  if (typeof statusFlag === 'string' && statusFlag === 'tokenInvalid') {
    updateToken(response.config)
    return res.data
  }
  if (res.status === REQUEST_SUCCESS) {
    return res.data
  } else {
    if (statusFlag !== 'undetermined') {
      const error = res.message
      if (!error) return res
      _Message({
        message: error,
        type: 'warn',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    } else {
      return res.data
    }
  }
}

function statusError(status) {
  let errorStatus = false
  switch (status) {
    case STATUS_CODE.code_06: // 用户未登陆或token已失效
      if (!refreshed) {
        errorStatus = 'tokenInvalid'
        refreshed = true
      } else {
        errorStatus = 'undetermined'
      }
      break
    case STATUS_CODE.code_07: // 用户未登陆或token已失效,跳到 /login
      if (sessionStorage.getItem('iframe')) {
        window.parent.postMessage('reaload', '*')
        return false
      }
      // router.push({
      //   path: '/'
      // })
      break
    case STATUS_CODE.code_11: // 连续{1}次输入错误帐号将被锁定登录
      break
    case STATUS_CODE.code_12: // 账号已被锁定
      break
    case STATUS_CODE.code_13: // 初始密码设置参数未定义
      break
    case STATUS_CODE.code_14: // 参数设置失败
      break
    case STATUS_CODE.code_15: // 初次登录，请重新设置密码
      break
    case STATUS_CODE.code_16: // 密码过期
      break
    case STATUS_CODE.code_17: // 您的账号异常，请联系管理员
      // router.push({
      //   path: '/'
      // })
      break
    case STATUS_CODE.code_18: // 您的账号已在其他设备上登录，请重新登录！
      // router.push({
      //   path: '/'
      // })
      break
    default:
      errorStatus = true
  }
  return errorStatus
}

function responseErrFunc(error) {
  if (error.message !== 'cancelApi') {
    _Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
  }
  return Promise.reject(error.message)
}

function requestErrFunc(error) {
  console.log(error) // 打印错误信息
  Promise.reject(error)
}

function refreshSuccess() {
  refreshed = false
}

/*function updateToken(requestConfig) {
  appService
    .get('/auth/jwt/refresh')
    .then(res => {
      //我去你丫的session，马上换成红军的cookie
      if (sessionStorage.getItem('iframe')) {
        window.parent.postMessage(res, '*')
      }
      sessionStorage.setItem('token', res)
      window.setTimeout(refreshSuccess, 3000)
    })
    .catch(() => {
      window.setTimeout(refreshSuccess, 3000)
    })
}*/

function updateToken(requestConfig) {
  if (Cookies.get('USERSDP-Token')) {
    window.parent.postMessage(Cookies.get('USERSDP-Token'), '*')
  }
  Cookies.set('USERSDP-Token', Cookies.get('USERSDP-Token'))
  window.setTimeout(refreshSuccess, 3000)
}




function _Message(options) {
  return Message({
    showClose: true,
    duration: 3 * 1000,
    ...options
  })
}

window.sdpApi = appService
