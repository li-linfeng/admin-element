import request from '@/utils/request'

export function getOrderNum() {
  return request({
    url: '/api/order_num',
    method: 'get',
  })
}


export function getOrderList(query) {
  return request({
    url: '/api/orders',
    method: 'get',
    params: query
  })
}


export function createOrder(data) {
  return request({
    url: '/api/orders',
    method: 'post',
    data
  })
}


