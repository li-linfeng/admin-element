import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function searchUserList(query) {
  return request({
    url: '/api/user_list',
    method: 'get',
    params: query
  })
}


export function getUserList(query) {
  return request({
    url: '/api/users',
    method: 'get',
    params: query
  })
}

export function getUserDetail(id) {
  return request({
    url: `/api/users/${id}`,
    method: 'get',
  })
}


export function createUser(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: `/api/users/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/api/users/${id}`,
    method: 'delete'
  })
}


export function resetPass(data) {
  return request({
    url: `/api/resetPass`,
    method: 'post',
    data
  })
}