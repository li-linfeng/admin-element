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

export function finishOrderItem(id) {
  return request({
    url: `/api/order_items/${id}/finish`,
    method: 'post',
  })
}


export function bindMaterialNum(id, data) {
  return request({
    url: `/api/order_items/${id}/bind`,
    method: 'post',
    data
  })
}


export function downloadMaterial(id) {
  return request({
    url: `/api/order_items/${id}/download`,
    method: 'get',
    responseType: "blob",
  })
}
