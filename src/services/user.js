import request from '../utils/request'
import qs from 'qs'

// async 异步请求
export async function query(params) {
    return request(`/api/user?${qs.stringify(params)}`)
}

export async function remove(id) {
    console.log('service', id)
    return request(`/api/user/delete?id=${id}`)
}

export async function queryOne(id) {
    return request(`/api/user/one?id=${id}`)
}

export async function updateProfile(obj) {
    console.log('service', obj)
    return request(`/api/user/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
}