import request from '@/utils/request'

export function getProjectList(query) {
  return request({
    url: '/api/projects',
    method: 'get',
    params: query
  })
}

export function addProject(data) {
  return request({
    url: '/api/projects',
    method: 'post',
    data
  })
}


export function updateProjectsStatus(id, data) {
  return request({
    url: `/api/projects/${id}/status`,
    method: 'patch',
    data
  })
}

export function deleteProjects(id) {
  return request({
    url: `/api/projects/${id}`,
    method: 'delete',
  })
}
