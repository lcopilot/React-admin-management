import http from '../public';
import sysConfig from '../sysConfig'
const apiUrl=sysConfig.smApiUrlPre;

export const login=(username,password)=>{
  return http.requestPost(apiUrl+'/login',{username,password})
}