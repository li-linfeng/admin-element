import request from '@/utils/request'

export function getCategoryList(query) {
  return request({
    url: '/api/categories',
    method: 'get',
    params: query
  })
}


