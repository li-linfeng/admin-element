import request from '@/utils/request'

export function getNewsList(query) {
  return request({
    url: '/api/news',
    method: 'get',
    params: query
  })
}

export function getNewsDetail(id) {
  return request({
    url: `/api/news/${id}`,
    method: 'get',
  })
}


export function createNews(data) {
  return request({
    url: '/api/news',
    method: 'post',
    data
  })
}

export function updateNews(id, data) {
  return request({
    url: `/api/news/${id}`,
    method: 'put',
    data
  })
}

export function deleteNews(id) {
  return request({
    url: `/api/news/${id}`,
    method: 'delete'
  })
}
