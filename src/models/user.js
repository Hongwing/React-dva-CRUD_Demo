import { hashHistory } from "dva/router";
import { query, remove, queryOne, updateProfile } from '../services/user'
import { notification } from "antd";

export default {
  namespace: 'user', // 命名空间绑定模型，全局区分

  state: { // 模型state Info
    list: [],
    totoal: null,
    loading: null, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作用户对象
    modalState: {
        modalVisible: false, // 模态框显示状态
        modalType: 'create', // 模态框类型
        modalLoading: false,
    },
    currentActiveObject: {},
  },

  // 订阅处理
  subscriptions: {
      setup({ dispatch, history}) {
          history.listen(location => {
              if (location.pathname === '/users') {
                  // 发起antion
                  dispatch({
                      type: 'queryAll',
                      payload: {}
                  })
              }
          })
      }
  },

  effects: { // action 异步业务处理
    *queryAll({ payload }, { select, put, call }) {
        yield put({ type: 'showLoading' })
        const data = yield call(query)
        if (data) {
            console.log('data from api', data, typeof data)
            const result = data.data
            yield put({
                type: 'querySuccess',
                payload: {
                    list: result.data,
                    total: result.page.total,
                    current: result.page.current,
                }
            })
        }
    },
    *create() {},
    // 关键字delete 加单引号处理
    *'delete' ({ payload }, { select, put, call }) {
        const { id } = payload
        console.log('models, call', id)
        const res = yield call(remove, id)
        console.log('res', res.data)
        yield put({
            type: 'querySuccess',
            payload: {
                list: res.data,
                loading: false
            }
        })
        notification['success']({
            message: 'Dva QuickStart',
            description: '删除成功',
            duration: 2.5
        })
    }, 
    *update({ payload }, { select, put, call }) {
        const { id } = payload
        const res = yield call(queryOne, id)
        console.log('res update', res)
        yield put({
            type: 'updateSuccess',
            payload: {
                currentActiveObject: res.data
            }
        })
        yield put({ type: 'showModal', payload: { loading: false} })
    },
    *updateUser({ payload }, { select, put, call }) {
        const { currentEditObject:obj } = payload
        console.log('model', payload)
        // modal 异步loading
        yield put({ type: 'showModal', payload: { loading: true }})
        const res = yield call(updateProfile, obj)
        yield put({
            type: 'updateSuccess',
            payload: {
                list: res.data
            }
        })
        yield put({ type: 'hideModal'})
    },

  },

  reducers: { // state更新处 唯一的state更新hook
    showLoading(state, action) {
       // 控制加载状态的loading
       return { ...state, loading: true} 
    }, 
    // 控制modal显示状态
    showModal(state, action) {
        const { loading } = { ...action.payload }
        return {...state, modalState: { modalVisible: true, modalLoading: loading }}
    }, 
    hideModal(state) {
        return {...state, modalState: { modalVisible: false, modalLoading: false }}
    },
    querySuccess(state, action) {
        // 静态数据
    //   const mock = {
    //     total: 3,
    //     current: 1,
    //     loading: false,
    //     list: [{
    //         name: '张三',
    //         age: 23,
    //         address: '成都',
    //       },
    //       {
    //         name: '李四',
    //         age: 24,
    //         address: '杭州',
    //       },
    //       {
    //         name: '王五',
    //         age: 25,
    //         address: '上海',
    //       },
    //     ],
    //   }
      // 动态数据
      return {...state, ...action.payload, loading: false}
    },
    createSuccess() {},
    deleteSuccess() {},
    updateSuccess(state, action) {
        return {...state, ...action.payload}
    },
  }
}
