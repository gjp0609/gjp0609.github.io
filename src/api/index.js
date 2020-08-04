// import axios from 'axios';
import apiArray from './apiArray.js';

const service = axios.create({
    baseURL: 'https://www.onysakura.com',
    timeout: 5000
});

apiArray.forEach((item) => {
    service(item.name, item.url, item.method);
});

export default service;