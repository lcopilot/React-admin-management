import React, {useEffect, useState} from "react";
import moment from "moment";

 const NowDate=(time)=> {
   const [nowTime,setTime] = useState(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss SSS'))
  useEffect(()=>{
    //启动定时器 获取当前时间
    const timer=setInterval(()=>{
      setTime(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss SSS'))
    },10)
    return ()=>{
      clearInterval(timer)
    }
  })
   return <div>{nowTime}</div>
}
export default NowDate