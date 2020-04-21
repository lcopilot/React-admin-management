import React, {useMemo, useState} from "react";
import {Form, Input, Button} from "antd";
import './login.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

/**
 * 登录的路由组件
 * @returns {*}
 * @constructor
 */

function validatePrimeUserName(userName) {
  const regular=/^[0-9a-zA-Z_]{1,}$/
  if (regular.test(userName) && null!=userName && userName.length<=12) {
    return {
      value:userName,
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    value:'',
    validateStatus: 'error',
    errorMsg: '请输入正确的格式!',
  };
}



const Login=() =>{

  const [userName, setUserName] = useState({
    value: null,
  });
  const [password, setPassword] = useState({
    value: null,
  });
  const [loading, setLoading] = useState({
    loading: false,
    loadingContent: '登录',});

  const onUserNameChange = e => {
    setUserName({
      ...validatePrimeUserName(e.target.value)
    });
  };

  const onPasswordChange= e => {
    setPassword({
      ...validatePrimeUserName(e.target.value),
      e,
    });
  };


  const  login = (from) => {
    if (password.validateStatus==='success' && userName.validateStatus==='success'){
      console.log(userName.value+"----------"+password.value)
      setLoading({ loading: true, loadingContent:'登录中 . . .'});
      setTimeout(() => {
        setLoading({loading: false,loadingContent:'登录' });
      }, 8000);
    }else if(userName.value===null){
      setUserName({
        validateStatus: 'error',
        errorMsg: '请输入用户名!',value:null})
    }else if(password.value===null){
      setPassword({
        validateStatus: 'error',
        errorMsg: '请输入密码!',
        value:null
      })
    }else if(userName.validateStatus==='error'){
      setUserName({
        value:'',
        validateStatus: 'error',
        errorMsg: '请输入正确的格式!',})
    }else if(password.validateStatus==='error'){
      setPassword({
        value:'',
        validateStatus: 'error',
        errorMsg: '请输入正确的格式!',})
    }

  };

  const onFinish =(values)=>{
    console.log('Received values of form: ',values );
  };

  return (
      <div className="login">
        <div className="login-content">
          <h2>微利商城后台</h2>
          <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
          >
            <Form.Item
                name="name"
                validateStatus={userName.validateStatus}
                help={userName.errorMsg}
            >
              <Input allowClear={true} prefix={<UserOutlined className="site-form-item-icon" />} value={userName.value} maxLength={12} onChange={onUserNameChange} placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
                name="password"
                validateStatus={password.validateStatus}
                help={password.errorMsg}
            >
              <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="请输入密码"
                  allowClear={true}
                  value={password.value} maxLength={12} onChange={onPasswordChange}
              />
            </Form.Item>

            <Form.Item >
              <Button type="primary" loading={loading.loading} onClick={login} block>
                {loading.loadingContent}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  )

}

export default Login