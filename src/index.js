import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import storageUtils from "./utils/storageUtils";
import {Provider} from 'react-redux'
import store from "./store";
import * as actionTypes from "./store/actionTypes";
import * as ActionCreators from "./store/actionCreators";


//读取 local 的数据
store.dispatch(ActionCreators.setUser(storageUtils.getUser()));

const AppReactRedux=(
    <Provider store={store}>
      <App/>
    </Provider>
);


ReactDOM.render(AppReactRedux,document.getElementById('root'));