import axios, { Method } from "axios";
import { message } from "antd";
import NProgress from "nprogress";
import { useHistory } from 'react-router'


const request = axios.create({
  timeout: 15000
});
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
request.interceptors.request.use(
  config => {
    NProgress.start();
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
request.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.data.code !== 0) {
      message.warn(response.data.message);
      return
    }
    return response.data
  },
  error => {
    NProgress.done();
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes("timeout")) {
        message.error("请求超时，请检查网络是否连接正常");
      } else {
        message.error("请求失败，请检查网络是否已连接");
      }
      return;
    }
    if (error.response.status === 401) {
      const history = useHistory()
      localStorage.setItem("authToken", '');
      history.push('/login')
    } else if (error.response.status === 500) {
      message.warning(error.response.data.message);
    } else if (error.response.status === 405) {
      message.error("请求不存在");
    }
    return Promise.reject(error);
  }
);

interface serviceProps {
  data: any,
  url: string,
  method: Method,
}

export function handleService(service: serviceProps) {
  if (service.method === "GET") {
    return request({
      url: "http://10.98.6.97:8080/" + service.url,
      params: service.data,
      method: service.method
    });
  } else {
    return request({
      url: "http://10.98.6.97:8080/" + service.url,
      data: service.data,
      method: service.method
    });
  }
}
