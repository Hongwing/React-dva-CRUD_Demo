// mock data
'use strict'

// const qs = require('qs');

// 引入 mock js
const mockjs = require('mockjs');

const data = mockjs.mock({
  'data|100': [{
    'id|+1': 1,
    name: '@cname',
    'age|11-99': 1,
    address: '@region'
  }],
  page: {
    total: 100,
    current: 1
  }
});

const api_user = {
  '/api/user': (req) => {
    // const page = qs.parse(req.query);
    // console.log('mock', page)

    const result = {
        success: true,
        ...data
    }

    return result
  },
  '/api/all': (req) => {
    return {
      hello: 'world'
    }
  },
  '/api/user/delete': (req) => {
    return {
      hello: 'req - ' + req
    }
  }
}

// api description

const getUser = {
  $desc: "get userinfo by mockjs",
  $params: {
    
  },
  $body: api_user['/api/user']()
}

const getUserAll = {
  $desc: "all user",
  $params: {
    hello: 'world'
  },
  $body: api_user['/api/all']()
}

const deleteUser = {
  $desc: 'delete user',
  $params: {
    id: ''
  },
  $body: api_user['/api/user/delete'](1)
}


const _index = function (i, ds)  {
  for (let index = 0; index < ds.length; index++) {
    const element = ds[index];
    if (parseInt(element.id) === parseInt(i)) {
      console.log('id content find it', element, 'deleted done.')
      return index
    }
  }
}

const opDeleteUser = (id) => {
  console.log('opDeleteUser', id)
  const { data: ds } = data
  ds.splice(_index(id, ds) || 0, 1)
  return ds
}

const opGetOneUser = (id) => {
  const { data: ds} = data
  console.log('mock', ds[_index(id, ds)])
  return ds[_index(id, ds)]
}

const opUpdateProfile = (obj) => {
  const { data: ds } = data
  ds[_index(obj.id, ds)] = {...obj}
  return ds
}

export default {
  getUser,
  getUserAll,
  deleteUser,
  /** data op */
  opDeleteUser,
  opGetOneUser,
  opUpdateProfile,
}
