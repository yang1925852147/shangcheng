//封装axios
import axios from "axios";

//创建一个实例
const service = axios.create({
  //基础路径
  baseURL: "/api",
  //超出的时间
  timeout: 10000,
});

//响应拦截
service.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default service;
