import request from '@/utils/request'

export function getMaterialSeq(data) {
  return request({
    url: '/api/material_seq',
    method: 'post',
    data
  })
}

export function getMaterialTreeList(query) {
  return request({
    url: '/api/materials',
    method: 'get',
    params: query
  })
}

export function addMaterial(data) {
  return request({
    url: '/api/materials',
    method: 'post',
    data
  })
}


export function deleteMaterial(id) {
  return request({
    url: `/api/materials/${id}`,
    method: 'delete',
  })
}
