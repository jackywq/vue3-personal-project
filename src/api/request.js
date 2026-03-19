import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 携带 token 等信息
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    const { code, data, message } = response.data;
    if (code === 200 || code === 0) {
      return data;
    }
    // 错误处理
    console.error(message || '请求失败');
    return Promise.reject(new Error(message || '请求失败'));
  },
  (error) => {
    if (error.response?.status === 401) {
      // 登录过期处理
      console.error('登录过期，请重新登录');
      localStorage.removeItem('token');
      // 可以在此处重定向到登录页
      window.location.href = '/login';
    } else {
      console.error(error.message || '网络异常');
    }
    return Promise.reject(error);
  }
);

export default request;
