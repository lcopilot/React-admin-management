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
  Tree, Form
} from "antd";
import './role.less'
import *as indexAPI from '../../api/page/index'
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import menuList from "../../config/menuConfig";
import moment from "moment";

const {Search} = Input;

const Role = () => {

  const [roles, setRoles] = useState([])
  const [roleVisible, setRoleVisible] = useState(false)
  const [roleInput, setRoleInput] = useState(false)
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState(['/home']);


  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name'
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      render:(create_time)=>moment(create_time).format('YYYY-MM-DD  HH:mm:ss')
    }, {
      title: '授权时间',
      dataIndex: 'auth_time',
      render:(auth_time)=>moment(auth_time).format('YYYY-MM-DD  HH:mm:ss')
    }, {
      title: '授权人',
      dataIndex: 'auth_name'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (role) => {
        return (
            <>
              <a  onClick={()=>{
                editAuthority(role)
              }}>编辑权限</a>
              <a  onClick={()=>{deleteRole(role)}}>删除</a>
            </>
        )
      },
    },
  ]

  const editAuthority = (role) => {
    const {menus,name}=role
    form.setFieldsValue({
      roleName:name
    })
    setRoleInput(true)
    setRoleVisible(true)
    setCheckedKeys(menus)
  }
  const deleteRole = (role) => {

  }

  const getRoles = () => {
    indexAPI.getRoles().then(res => {
      if (res.status === 0) {
        setRoles(res.data)
      }
    })
  }
  const addRole = () => {
    form.validateFields().then(values => {
      console.log(values)
      form.resetFields();
    })
  }

  useEffect(() => {
    getRoles();
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
              placeholder="查询角色"
              onSearch={value => console.log(value)}
          />
        </Col>
        <Col xs={24} sm={24} md={9} lg={9} xl={11}>
          <Button type='primary' onClick={() => {
            setRoleVisible(true)
          }}>创建角色</Button>
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
              pagination={{defaultPageSize: 3}}
          />
          <Modal
              getContainer={false}
              title="创建角色"
              visible={roleVisible}
              onOk={addRole}
              onCancel={() => {
                setRoleVisible(false);
                form.resetFields();
              }}
          >
            <Form
                form={form}
                name="normal_login"
                initialValues={{remember: true}}
            >
              <Form.Item
                  name="roleName"
                  rules={[{
                    required: true,
                    whitespace: true,
                    message: '请输入角色名 1-12位',
                    min: 1,
                    max: 12
                  },
                    {
                      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
                      message: '角色名必须是中英文、数字或下划线组成'
                    },]}
              >
                <Input allowClear={true}
                       disabled={roleInput}
                       prefix={<UserOutlined className="site-form-item-icon"/>}
                       maxLength={12} placeholder="请输入角色名"/>
              </Form.Item>
              <Form.Item label='设置权限'>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    showIcon
                    treeData={menuList}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </>
  )
}

export default Role