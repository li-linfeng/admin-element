import request from '@/utils/request'

export function getSaleRequestList(query) {
  return request({
    url: '/api/sale_requests',
    method: 'get',
    params: query
  })
}

export function getSaleRequestDetail(id) {
  return request({
    url: `/api/sale_requests/${id}`,
    method: 'get',
  })
}


export function createSaleRequest(data) {
  return request({
    url: '/api/sale_requests',
    method: 'post',
    data
  })
}

export function updateSaleRequest(id, data) {
  return request({
    url: `/api/sale_requests/${id}`,
    method: 'put',
    data
  })
}

export function deleteSaleRequest(id) {
  return request({
    url: `/api/sale_requests/${id}`,
    method: 'delete'
  })
}

export function getSaleRequestNum(){
  return request({
    url: `/api/sale_request_num`,
    method: 'get'
  })
}
