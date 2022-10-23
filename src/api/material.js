import request from '@/utils/request'


export function getMaterialTreeList(query) {
  return request({
    url: '/api/material_tree',
    method: 'get',
    params: query
  })
}

export function addMaterial(data) {
  return request({
    url: `/api/materials`,
    method: 'post',
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

