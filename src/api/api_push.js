/**
 * 推送相关api
 */
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8080';
let config = {headers:{ 'content-type': 'application/json;charset=UTF-8' } };

export const sendEmail = params =>{return axios.post('/v1/emails/send', params, config).then(res => res.data)};
export const getEmailList = params =>{return axios.get('/v1/emails/emailList', {params}, config).then(res => res.data)};
export const getEmailListBySubject = params =>{return axios.get('/v1/emails/getEmailListBySubject', {params}, config).then(res => res.data)};
export const getEmailListByEmail_to = params =>{return axios.get('/v1/emails/getEmailListByEmail_to', {params}, config).then(res => res.data)};



export const jpush = params =>{return axios.post('/v1/jpush/push', params, config).then(res => res.data)};
export const getJPushList = params =>{return axios.get('/v1/jpush/jpushList', {params}, config).then(res => res.data)};
export const getJPushListByNotification = params =>{return axios.get('/v1/jpush/getJPushListByNotification', {params}, config).then(res => res.data)};

export const sendSms = params =>{return axios.post('/v1/sms/sendSms', params, config).then(res => res.data)};
export const sendSmsBatch = params =>{return axios.post('/v1/sms/sendSmsBatch', params, config).then(res => res.data)};
export const getSmsList = params =>{return axios.get('/v1/sms/smsList', {params}, config).then(res => res.data)};
export const getSmsListByMobile = params =>{return axios.get('v1/sms/getSmsListByMobile', {params}, config).then(res => res.data)};
