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


export function getToDoList(query) {
  return request({
    url: `/api/todo`,
    method: 'get',
    params: query
  })
}
export function readTodo(id) {
  return request({
    url: `/api/todo/${id}/read`,
    method: 'put',
  })
}

export function readAll() {
  return request({
    url: `/api/todo/readAll`,
    method: 'post',
  })
}