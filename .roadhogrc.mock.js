// roadhog mock
import { delay, format } from 'roadhog-api-doc'
// 导入mock/.js
import User from './mock/user'

const qs = require('qs')

const { getUser, getUserAll, deleteUser, opDeleteUser, opGetOneUser, opUpdateProfile } = User

const data = {
  'GET /api/user': getUser,
  'GET /api/all': getUserAll,
  'GET /api/user/delete': (req, res) => {
    const { id } = qs.parse(req.query)
    console.log(id)
    const data = opDeleteUser(id)
    res.end(JSON.stringify(data))
  },
  'GET /api/user/one': (req, res) => {
    const { id } = qs.parse(req.query)
    res.end(JSON.stringify(opGetOneUser(id)))
  },
  'POST /api/user/update': (req, res) => {
    console.log('update', qs.parse(req.body))
    res.end(JSON.stringify(opUpdateProfile(req.body)))
  }
  }

// format() 格式化api数据 注： 貌似format意义不大
// delay() 

// 延时模拟服务器请求
export default delay(data, 1500)
// export default format(data)
// export default data