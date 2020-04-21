import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

//读取 local 的数据
memoryUtils.user=storageUtils.getUser()


ReactDOM.render(<App/>,document.getElementById('root'));