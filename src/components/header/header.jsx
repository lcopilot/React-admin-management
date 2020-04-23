import React, { useContext, useEffect, useState} from 'react'
import './header.less'
import {Avatar, Modal,Tabs, Dropdown, Layout, Menu, Badge} from 'antd';
import {MenuUnfoldOutlined,ExclamationCircleOutlined,BellOutlined,SettingOutlined,LogoutOutlined, MenuFoldOutlined} from '@ant-design/icons';
import  { CountContext } from '../../pages/admin/admin'
import memoryUtils from "../../utils/memoryUtils";
import {useHistory} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import NowDate from "../../utils/dateUtils";
const { Header} = Layout;
const { TabPane } = Tabs;
const { confirm } = Modal;

const HeaderNav=()=>{

  const history = useHistory();
  const {collapsed ,setCollapsed} = useContext(CountContext);
  const [bell,setBell]=useState({notice:10,message:5,commission:9})


  const trigger=()=>{
    setCollapsed(!collapsed)
  }



  const shutDown=()=>{
    confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '你确定退出吗?',
      cancelText:'取消',
      okText:'确定',
      onOk() {
        storageUtils.removeUser()
        memoryUtils.user={};
        history.replace("/login");
      },
    });

  };

  const userMenu = (
      <Menu>
        <Menu.Item >
          <SettingOutlined />
            个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item  onClick={shutDown}>
            <LogoutOutlined />
            退出登录
        </Menu.Item>
      </Menu>
  );

  const menu = (
      <Menu>
        <div className="header-message">
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span>通知&nbsp;&nbsp;({bell.notice})</span>} key="1">
                速度还是大
            </TabPane>
            <TabPane  tab={<span>消息&nbsp;&nbsp;({bell.message})</span>} key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab={<span>代办&nbsp;&nbsp;({bell.commission})</span>} key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </Menu>
  );
  return(
      <Header className="header">
        <div>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: trigger,
          })}
        </div>
        <div className="header-index-right">
          <div>
            <NowDate/>
          </div>
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <div className="header-message-icon">
              <Badge count={bell.notice+bell.message+bell.commission || 0} overflowCount={99} >
                <BellOutlined />
              </Badge>
            </div>
          </Dropdown>
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className="header-index-user">
              <Avatar size="small" src="http://img.fhxasdsada.xyz/iduyadfgjdekldjhf.png" />
              <span>{memoryUtils.user.username}</span>
            </div>
          </Dropdown>
        </div>

      </Header>
  )
}

export default HeaderNav