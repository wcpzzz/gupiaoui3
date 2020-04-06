import request from '@/utils/request'

export function showK(data) {
  return request({
    url: '/gupiao/showK',
    method: 'post',
    data
  })
}

export function analysisList(data) {
  return request({
    url: '/gupiao/analysisAll',
    method: 'post',
    data
  })
}

export function gupiaoList(data) {
  return request({
    url: '/gupiao/allgp2',
    method: 'post',
    data: {}
  })
}

export function analysisCreate(data) {
  return request({
    url: '/gupiao/analysisCreate',
    method: 'post',
    data
  })
}
export function showAnalysis(data) {
  return request({
    url: '/gupiao/showAnalysis',
    method: 'post',
    data
  })
}
export function showAnalysis2(data) {
  return request({
    url: '/gupiao/showAnalysis2',
    method: 'post',
    data
  })
}



export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function del(params) {
  return request({
    url: '/gupiao/del/'+params,
    method: 'get',
    params
  })
}

export function junzhiList(data) {
  return request({
    url: '/gupiao/junzhiList',
    method: 'post',
    data
  })
}
