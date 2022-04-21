import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/abi/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/abi/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/abi/user/logout',
    method: 'post'
  })
}