import request from '@/utils/request'
import requestSDP from '@/utils/requestSDP'
import requestUSERSDP from '@/utils/requestUSERSDP'

export function resetUserToken(data) {
  return requestUSERSDP({
    url: '/opensource/sdp/auth/jwt/shortcut/token',
    method: 'post',
    data
  })
}

export function getUserToken(data) {
  return requestUSERSDP({
    url: '/opensource/sdp/auth/jwt/token',
    method: 'post',
    data
  })
}


export function getBoardId() {
  return requestUSERSDP({
    url: '/opensource/sdp/bi/metaClassify/tree',
    method: 'get',
  })
}
