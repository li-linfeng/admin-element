import request from '@/utils/request'

export function getCategoryTreeList(query) {
  return request({
    url: '/api/categories',
    method: 'get',
    params: query
  })
}

export function addCategory(data) {
  return request({
    url: '/api/categories',
    method: 'post',
    data
  })
}

