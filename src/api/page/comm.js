import http from '../public';
import sysConfig from '../sysConfig'
const weatherAPi=sysConfig.weatherAPi;

export const getWeather=()=>{
  const CITY='changsha'
  return http.requestGet(weatherAPi+'he/freeweather?city='+CITY+'&appkey=7667586d537437ed96ba55cd7c4135e4')
}
