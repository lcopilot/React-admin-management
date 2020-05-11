import http from '../public';
import sysConfig from '../sysConfig'
const apiUrl=sysConfig.smApiUrlPre;

//获取角色列表
export const getRoles=()=>{
  return http.requestGet(apiUrl+'/manage/role/list',)
}
