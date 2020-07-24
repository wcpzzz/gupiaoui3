import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenKeySDP = 'SDP-Token'
const TokenKeyUSERSDP = 'USERSDP-Token'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getTokenSDP() {
  return Cookies.get(TokenKeySDP)
}

export function setTokenSDP(token) {
  return Cookies.set(TokenKeySDP,token)
}

export function removeTokenSDP() {
  return Cookies.remove(TokenKeySDP)
}



export function getTokenUSERSDP() {
  return Cookies.get(TokenKeyUSERSDP)
}

export function setTokenUSERSDP(token) {
  return Cookies.set(TokenKeyUSERSDP,token)
}

export function removeTokenUSERSDP() {
  return Cookies.remove(TokenKeyUSERSDP)
}
