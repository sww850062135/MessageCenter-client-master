/**
 *
 * 用户相关api
 */
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8080';

let config = {headers:{ 'content-type': 'application/json;charset=UTF-8' } };

export const requestLogin =
  //登录
  params => {
    return axios.post('/v1/users/login', params, config).then(res => res.data)
  }
  //登出
export  const logout = params => {
    return axios.get('/v1/users/logout', params, config).then(res => res.data)
  }
  //修改个人信息
export  const changeProfile = params => {
    return axios.post('/v1/users/changeProfile', params, config).then(res => res.data)
  }

  //查询获取user列表(通过page分页)
 /* findList: params => {
    return API.GET('/api/v1/users', params)
  },*/

