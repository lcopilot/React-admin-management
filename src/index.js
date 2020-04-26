import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import storageUtils from "./utils/storageUtils";
import {Provider} from 'react-redux'
import store from "./store";
import * as ActionCreators from "./store/actionCreators";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";

//读取 local 的数据
store.dispatch(ActionCreators.setUser(storageUtils.getUser()));

const AppReactRedux = (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App/>
      </Provider>
    </ConfigProvider>
);

ReactDOM.render(AppReactRedux, document.getElementById('root'));