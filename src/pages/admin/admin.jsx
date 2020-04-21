import React from "react";
import memoryUtils from "../../utils/memoryUtils";
import { useHistory } from "react-router-dom";

/**
 * 管理的路由组件
 * @returns {*}
 * @constructor
 */

 const Admin=()=> {
   const  history=useHistory()
  const user = memoryUtils.user

  if(!user || !user._id){
     history.replace("/login")
  }

  return (<div>
    hello {user.username}
  </div>)

}

export default Admin