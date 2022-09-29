import request from '@/utils/request'

export function getHandlerList(query) {
  return request({
    url: '/api/handlers',
    method: 'get',
    params: query
  })
}


export function setHandler(id,data) {
  return request({
    url: `/api/handlers/${id}/user`,
    method: 'put',
    data
  })
}