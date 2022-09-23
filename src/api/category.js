import request from '@/utils/request'

export function getCategoryList(query) {
  return request({
    url: '/api/categories',
    method: 'get',
    params: query
  })
}


export function addHandler(id,params) {
  return request({
    url: `/api/categories/${id}/handler`,
    method: 'post',
    params
  })
}