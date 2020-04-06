import request from '@/utils/request'

export function api(data) {
  return request({
    url: '/gupiao/changePwd',
    method: 'post',
    data
  })
}
