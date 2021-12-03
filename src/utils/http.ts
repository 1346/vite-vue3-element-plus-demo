import axios, { AxiosResponse } from "axios";
import { getToken, removeToken } from "./auth";
import { ElMessage } from 'element-plus';

const baseURL: any = import.meta.env.VITE_ENV_CONFIG == 'dev' ? import.meta.env.VITE_API_URL : (location.protocol + '//' + import.meta.env.VITE_API_URL)

const instance = axios.create({
    baseURL: baseURL,
    timeout: 60000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        const token = getToken()
        // 给接口请求统一加上header
        // if (token) {
        //     config.headers["adminToken"] = token;
        // }
        return Promise.resolve(config)
    },
    error => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
    (response): any => {
        if (response.status === 200) {
            const result = response.data;
            const { data, code, attributes, message } = result;

            if (code > 0) {
                if (!data) {
                    result.data = [];
                }
                return Promise.resolve(result)
            } else if (code === -403) {
                ElMessage({
                    type: "error",
                    message: message,
                    duration: 1500,
                    onClose: () => {
                        removeToken()
                        location.reload()
                    },
                })
            } else if (code === 0) {
                if (message) {
                    ElMessage.error(message)
                } else {
                    ElMessage.error("访问出错，请稍后再试或者联系联系管理员")
                }
                return Promise.reject(result)
            }

            return Promise.resolve(result)
        }
    },
    error => {
        apiLog(error)
        ElMessage.error(error.message)
    }
);

function apiLog(response: AxiosResponse) {
    if (import.meta.env.ENV_CONFIG === 'prod') return;
    const isError = response instanceof Error;
    const data = response.data;
    const url = response.config.url;
    const method = response.config.method;
    const params = response.config.params || response.config.data;

    if (isError) {
        console.error(`---------接口出现异常---------`);
        console.error(`请求地址：`, url);
        console.error(`请求方法：`, method);
        console.error(`请求参数`, params);
        console.error(`返回参数`, data);
        console.error(`错误信息: `, (response as any).message);
    } else {
        console.log(`---------接口返回信息---------`);
        console.log(`请求地址：`, url);
        console.log(`请求方法：`, method);
        console.log(`请求参数`, params);
        console.log(`返回参数`, data);
    }
}

export default instance