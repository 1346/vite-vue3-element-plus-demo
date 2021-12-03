import http from '../utils/http'

interface loginModel {
    account: string; // 用户名
    passwd: number; // 密码
}

export function login$(params: loginModel) {
    return http.request({
        url: '/admin/login',
        method: 'post',
        params
    })
}