import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/api/permissions',
    method: 'get',
  })
}

export function getUserPermissions() {
  return request({
    url: '/api/user_permissions',
    method: 'get',
  })
}