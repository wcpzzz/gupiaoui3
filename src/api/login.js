import request from '@/utils/request'
import requestSDP from '@/utils/requestSDP'
import requestUSERSDP from '@/utils/requestUSERSDP'


export function login(username, password,verifyCode) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userCode:username,
      userPwd:password,
      verifyCode
    }
  })
}

export function online(token) {
  return request({
    url: '/user/online',
    method: 'post',
    token
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function resetToken() {
  return requestSDP({
    url: '/opensource/sdp/auth/jwt/open/token',
    method: 'post',
    data: {
      appId:"337629304282140672410",
      secret: "337629507911405568410"
    }
  })
}
