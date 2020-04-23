import {createFromIconfontCN} from "@ant-design/icons";
import React from "react";

const IconIconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1647936_7oz3pef4on2.js',
});
const Icon=(props)=>{
  const {type}= props;
  return <IconIconfont type={type}/>
};
export default Icon