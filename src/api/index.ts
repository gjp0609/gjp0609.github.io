import axios from 'axios';

const service = axios.create({
    baseURL: 'https://www.onysakura.fun',
    timeout: 5000
});

export default service;
