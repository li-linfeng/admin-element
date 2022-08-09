const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@name(1, 5)',
    parentId: '@increment',
    'level|1': [0, 1]
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/article/list',
    type: 'get',
    response: config => {
      const { name, id, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (id && item.id !== id) return false
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-admin-template/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-admin-template/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-admin-template/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/article/parent',
    type: 'get',
    response: _ => {
      const mockList = List.filter(item => {
        return item.level !== 0
      })
      return {
        code: 20000,
        data: {
          items: mockList
        }
      }
    }
  }
]

