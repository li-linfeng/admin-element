import request from '@/utils/request'

export function getWeather() {
  return request({
    url: `/api/weather`,
    method: 'get',
  })
}