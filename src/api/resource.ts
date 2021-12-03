import http from '../utils/http'

export function queryResouce$() {
    return http.request({
        url: "/mall/rank/beloved/product/list",
        method: "get"
    })
}