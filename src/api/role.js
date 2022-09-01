import request from '@/utils/request'



export function getRoleList(query) {
  return request({
    url: '/api/roles',
    method: 'get',
    params: query
  })
}


export function createRole(data) {
  return request({
    url: '/api/roles',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/api/roles/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/roles/${id}`,
    method: 'delete'
  })
}
