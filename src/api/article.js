import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-admin-template/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-admin-template/article/detail',
    method: 'get',
    params: { id }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-admin-template/article/create',
    method: 'post',
    data
  })
}
export function getParentList(data) {
  return request({
    url: '/vue-admin-template/article/parent',
    method: 'get',
    data
  })
}

