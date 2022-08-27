import request from '@/utils/request'

export function getPreSaleList(query) {
  return request({
    url: '/api/preSales',
    method: 'get',
    params: query
  })
}

export function updatePreSale(id, data) {
  return request({
    url: `/api/preSales/${id}`,
    method: 'put',
    data
  })
}


