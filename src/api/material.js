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
    url: '/api/material_tree',
    method: 'get',
    params: query
  })
}

export function addMaterial(id,data) {
  return request({
    url: `/api/materials/${id}`,
    method: 'put',
    data
  })
}


export function bindMaterial(id, data) {
  return request({
    url: `/api/materials/${id}/rel`,
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
