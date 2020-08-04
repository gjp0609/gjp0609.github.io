// import axios from 'axios';

const service = axios.create({
    baseURL: 'https://www.onysakura.com',
    timeout: 5000
});

export default service;