import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router/index';

const service = axios.create({
    baseURL: 'https://www.onysakura.com',
    timeout: 5000
});

export default service;

export const algorithmService = axios.create({
    baseURL: 'http://spring.algorithm.onysakura.com',
    timeout: 5000
});

algorithmService.interceptors.request.use(
    (config) => {
        // 在发送请求之前做什么
        if (config.url !== '/auth/login') {
            let tokenTime = localStorage.getItem('tokenTime');
            if (tokenTime && parseInt(tokenTime) + 1000 * 60 > new Date().getTime()) {
                let token = localStorage.getItem('token');
                config.headers['Authorization'] = 'Bearer ' + token;
            } else {
                console.log('redirect');
                router.push('/algorithm/login');
            }
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么，自己定义
        Message({
            //使用element-ui的message进行信息提示
            showClose: true,
            message: error,
            type: 'warning'
        });
        return Promise.reject(error);
    }
);
