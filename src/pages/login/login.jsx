import React, { useState} from "react";
import {Form, Input, Button, message} from "antd";
import './login.less'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import *as userApi from '../../api/page/user'
import { useHistory } from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import {connect} from 'react-redux'
import *as ActionCreators from '../../store/actionCreators'

/**
 * 登录的路由组件
 * @returns {*}
 * @constructor
 */


const Login = (props) => {
  let history = useHistory();
  //如果用户已登录
  let {user,setUser}=props
  if(user && user._id){
    history.replace("/")
  }

  const [loading, setLoading] = useState({
    loading: false,
    loadingContent: '登录',
  });

  const login = (form) => {
    setLoading({loading: true, loadingContent: '登录中 . . . '})
    const {username, password} = form
    userApi.login(username,password).then(res=>{
      if (res.status===0){
        message.success("登录成功!")
        const user=res.data
        setUser(user)
        storageUtils.saveUser(user)
        history.replace("/");
      }else {
        message.error(res.msg)
        setLoading({loading: false, loadingContent: '登录'})
      }
    })
  };

  return (
      <div className="login">
        <div className="login-content">
          <h2>微利商城后台</h2>
          <Form
              name="normal_login"
              initialValues={{remember: true}}
              onFinish={login}
          >
            <Form.Item
                name="username"
                rules={[{required: true, whitespace: true, message: '请输入用户名 4-12位',min: 4,max: 12},
                  {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'},]}
            >
              <Input allowClear={true}
                     prefix={<UserOutlined className="site-form-item-icon"/>}
                     maxLength={12} placeholder="请输入用户名"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, whitespace: true, message: '请输入密码 4-12位',min: 4,max: 12},
                  {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'},]}
            >
              <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  placeholder="请输入密码"
                  allowClear={true}
                  maxLength={12}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" loading={loading.loading} htmlType="submit"
                      block>
                {loading.loadingContent}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  )
}

const stateToProps=(state)=>{
  return {
    user:state.user,
  }
}

const dispatchToProps=(dispatch)=>{
  return{
    setUser(data){
      dispatch(ActionCreators.setUser(data))
    }
  }
}


export default connect(stateToProps,dispatchToProps)(Login);