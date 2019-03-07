
import Axios from 'axios';
import { environment } from './devConfig';

import { MessageBox } from 'element-ui'

import {USER_AUTH_TOKEN, deleteUserAuthToken, deleteUserLoginInfo} from './storage';

/**
 * 处理清除 token
 * 清除登录信息
 * 回到登录页面
 */
export const handleReRegister = () => {
    deleteUserAuthToken();
    deleteUserLoginInfo();
    location.reload();
};

Axios.defaults.timeout = 0;
Axios.defaults.baseURL = environment.baseURL;

// request 拦截器
Axios.interceptors.request.use(
    config => {
        let tokenItem = JSON.parse(localStorage.getItem(USER_AUTH_TOKEN))
        if (tokenItem) {
            config.headers['Authorization'] = 'Bearer ' + tokenItem;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// response 拦截
Axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        let message = error.response ? error.response.data.message+'（错误码：'+ error.response.data.code+'）' : '' // 请求超时 error.response 是 undefined
        // if (error.response.data.debug != null) { message = message + error.response.data.debug} // 请求超时 error.response 是 undefined
        let title = '错误提示'

        if (error.code === 'ECONNABORTED') {
            MessageBox({
                title: title,
                type: 'error',
                message: '数据请求超时',
                confirmButtonText: '重新请求'
            }).then(()=>{
                return Axios(error.config);
            })
        } else {
            switch (error.response.status) {
                case 401:
                    // 用户未登录
                    MessageBox({
                        title: title,
                        type: 'warning',
                        message: message,
                        confirmButtonText: '返回登录页面'
                    }).then(()=>{
                        handleReRegister();
                    })
                    break;
                case 402:
                case 404:
                case 403:   // 用户权限不足
                case 400:
                case 405:
                case 422:
                case 500:
                    MessageBox({
                        title: title,
                        type: 'warning',
                        message: message,
                    })
                    break;
                default:
                    MessageBox({
                        title: title,
                        type: 'error',
                        message: '网络未知错误',
                    })
                    break;
            }
        }

        return Promise.reject(error);
    }
);


export default Axios;
