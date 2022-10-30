import request from '@/utils/request'

export function getPreSaleList(query) {
  return request({
    url: '/api/preSales',
    method: 'get',
    params: query
  })
}

export function bindSale(id, data) {
  return request({
    url: `/api/sale_requests/${id}/bind_pre_sales`,
    method: 'post',
    data
  })
}

export function ReturnSaleRequest(id, data) {
  return request({
    url: `/api/sale_requests/${id}/return`,
    method: 'post',
    data
  })
}

export function FinishSaleRequest(id, data) {
  return request({
    url: `/api/sale_requests/${id}/finish`,
    method: 'post',
    data
  })
}



export function exportPreSales(query) {
  return request({
    url: `/api/preSales/download`,
    method: 'get',
    params: query,
    responseType: "blob",
  })
}