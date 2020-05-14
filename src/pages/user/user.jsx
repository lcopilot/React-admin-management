import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  Input,
  DatePicker,
  Row,
  Col,
  Table,
  Modal,
  Tree, Form, Menu, Select
} from "antd";
import *as indexAPI from '../../api/page/index'
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import menuList from "../../config/menuConfig";
import moment from "moment";
import {connect} from "react-redux";

import * as ActionCreators from "../../store/actionCreators";
import {
  PAGINATION,
  TIME_FORMAT
} from "../../config/sysConfig";
import {LockOutlined} from "@ant-design/icons";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import TabletOutlined from "@ant-design/icons/lib/icons/TabletOutlined";

const {Search} = Input;
const {Option} = Select;

const User = (props) => {
  let {user} = props
  const [roles, setRoles] = useState([])
  const [userVisible, setUserVisible] = useState(false)
  const [userInput, setUserInput] = useState(false)
  const [form] = Form.useForm();

  const columns = [
    {
      title: '用户名称',
      dataIndex: 'name'
    }, {
      title: '邮箱',
      dataIndex: 'name'
    }, {
      title: '电话',
      dataIndex: 'name'
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (create_time) => moment(create_time).format(
          TIME_FORMAT)
    }, {
      title: '创建人',
      dataIndex: 'auth_name'
    }, {
      title: '上次修改时间',
      dataIndex: 'auth_time',
      render: (auth_time) => moment(auth_time).format(TIME_FORMAT)
    }, {
      title: '上次修改人',
      dataIndex: 'auth_name'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (role) => {
        return (
            <>
              <a onClick={() => {
                editAuthority(role)
              }}>编辑用户</a>
              <a onClick={() => {
                deleteUser(role)
              }}>删除</a>
            </>
        )
      },
    },
  ]

  const editAuthority = (role) => {
    const {name, _id} = role
    form.setFieldsValue({
      userName: name,
      password: name,
      email: name,
      phone: name,
      role: _id,
    })
    setUserInput(true)
    setUserVisible(true)
  }
  const deleteUser = (role) => {

  }

  //渲染用户角色列表
  const getRoleOption = () => {
    const roleOption = []
    roles.map(item => {
      roleOption.push((<Option key={item._id}>{item.name}</Option>));
    })
    return roleOption
  }

  //获取角色
  const getRoles = () => {
    indexAPI.getRoles().then(res => {
      if (res.status === 0) {
        setRoles(res.data)
      }
    })
  }
  //添加角色
  const addUser = () => {
    form.validateFields().then(values => {
      console.log(values)
      form.resetFields();
    })
  }

  useEffect(() => {
    getRoles();
    getRoleOption();
    return () => {
    }
  }, [])

  const title = (
      <Row gutter={16}>
        <Col xs={24} sm={9} md={6} lg={6} xl={4}>
          <DatePicker.RangePicker/>
        </Col>
        <Col xs={24} sm={15} md={9} lg={9} xl={9}>
          <Search
              placeholder="查询用户"
              onSearch={value => console.log(value)}
          />
        </Col>
        <Col xs={24} sm={24} md={9} lg={9} xl={11}>
          <Button type='primary' onClick={() => {
            setUserVisible(true)
          }}>创建用户</Button>
        </Col>
      </Row>
  )
  return (
      <>
        <Card title={title}>
          <Table
              bordered
              rowKey={(item) => item._id}
              dataSource={roles}
              columns={columns}
              pagination={{
                defaultPageSize: PAGINATION.PAGE_SIZE,
                total: roles.length,
                showTotal: PAGINATION.SHOW_TOTAL,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS
              }}
          />
          <Modal
              getContainer={false}
              title="创建角色"
              visible={userVisible}
              onOk={addUser}
              onCancel={() => {
                setUserVisible(false);
                setUserInput(false)
                form.resetFields();
              }}
          >
            <Form
                form={form}
                name="normal_login"
                initialValues={{remember: true}}
            >
              <Form.Item
                  name="userName"
                  rules={[{
                    required: true, //是否必需输入
                    whitespace: true, //是否允许空格
                    message: '请输入角色名 1-12位',
                    min: 1,
                    max: 12
                  },
                    {
                      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, //正则
                      message: '角色名必须是中英文、数字或下划线组成'
                    },]}
              >
                <Input allowClear={true}
                       disabled={userInput}
                       prefix={<UserOutlined/>}
                       maxLength={12} placeholder="请输入用户名"/>
              </Form.Item>
              <Form.Item
                  name="password"
                  rules={[{
                    required: true,
                    whitespace: true,
                    message: '请输入密码 4-12位',
                    min: 4,
                    max: 12
                  },
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'},]}
              >
                <Input.Password
                    prefix={<LockOutlined/>}
                    placeholder="请输入密码"
                    allowClear={true}
                    maxLength={12}
                />
              </Form.Item>
              <Form.Item
                  name="email"
                  rules={[{
                    required: true,
                    whitespace: true,
                    message: '请输入电子邮件'
                  }, {type: 'email', message: '请输入正确的邮件格式',}]}
              >
                <Input allowClear={true}
                       prefix={<MailOutlined/>}
                       maxLength={40} placeholder="请输入电子邮件"/>
              </Form.Item>
              <Form.Item
                  name="phone"
                  rules={[{required: true, whitespace: true, message: '请输入手机号'},
                    {
                      pattern: /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/,
                      message: '请输入正确的手机号'
                    },]}
              >
                <Input allowClear={true}
                       prefix={<TabletOutlined/>}
                       maxLength={11} placeholder="请输入手机号"/>
              </Form.Item>
              <Form.Item
                  name="role"
                  rules={[{required: true, whitespace: true, message: '请选择角色'}]}
              >
                <Select showSearch
                        menuItemSelectedIcon={<UserOutlined/>}
                        placeholder="请选择角色"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase())
                          !== -1
                        }
                >
                  {getRoleOption()}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </>
  )
}

const stateToProps = (state) => {
  return {
    user: state.user,
    userAuth: state.userAuth,
  }
}
const dispatchToProps = (dispatch) => {
  return {
    setUserAuth(data) {
      dispatch(ActionCreators.setUserAuth(data))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(User)
