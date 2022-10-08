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

export function updateSaleRequest(data,id) {
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


export function publishSaleRequest(id){
  return request({
    url: `/api/sale_requests/${id}/publish`,
    method: 'post',
  })
}

export function exportSaleRequest(query) {
  return request({
    url: `/api/sale_requests/download`,
    method: 'get',
    params: query,
    responseType: "blob",
  })
}
