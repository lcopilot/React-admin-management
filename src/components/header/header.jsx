import React, {useContext, useEffect, useState} from 'react'
import './header.less'
import {
  Avatar,
  Modal,
  Tabs,
  Dropdown,
  Layout,
  Menu,
  Badge,
  Tooltip, Drawer
} from 'antd';
import {
  MenuUnfoldOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import {CountContext} from '../../pages/admin/admin'
import {useHistory} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import NowDate from "../../utils/dateUtils";
import *as commApi from '../../api/page/comm'
import moment from "moment";
import {connect} from 'react-redux'
import * as ActionCreators from "../../store/actionCreators";
import LeftNav from "../left-naw/left-nav";

const {Header} = Layout;
const {TabPane} = Tabs;
const {confirm} = Modal;

const HeaderNav = (props) => {

  const history = useHistory();
  const {collapsed, setCollapsed} = useContext(CountContext);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsedLNav, setCollapsedLNav] = useState(true)
  const [bell, setBell] = useState({notice: 10, message: 5, commission: 9})
  const [weather, setWeather] = useState(
      {
        now: {cond: {txt: "晴"}, tmp: "20"},
        basic: {city: '长沙', update: {loc: ''}}
      })
  let {user, setUser} = props
  let weatherTimer = 0

  //侧边栏的收缩
  const trigger = () => {
    const width = document.body.clientWidth
        || document.documentElement.clientWidth
    if (width <= 700) {
      return setDrawerVisible(true)
    }
    setCollapsed(!collapsed)
  }
  //退出
  const shutDown = () => {
    confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined/>,
      content: '你确定退出吗?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        storageUtils.removeUser()
        setUser({});
        history.replace("/login");
      },
    });

  };
  //获取天气
  const getWeather = () => {
    (async () => {
      commApi.getWeather().then(res => {
        if (res.result.HeWeather5[0].status === 'ok') {
          storageUtils.saveWeather(res.result.HeWeather5[0]);
          setWeather(storageUtils.getWeather())
        }
      });
    })();
  }
  //天气计时器
  const startWeather = () => {
    const weather = storageUtils.getWeather()
    if (!weather) {
      getWeather();
      weatherTimer = setTimeout(() => {
        getWeather();
      }, moment(new Date()).add(1, 'H').set(
          {minute: '01', second: '00', millisecond: '000'}) - moment(
          new Date()))
    } else {
      setWeather(storageUtils.getWeather())
      if ((moment(new Date()).add(1, 'H').set(
          {minute: '01', second: '00', millisecond: '000'}) - moment(
          weather.basic.update.loc)) > 3600000) {
        getWeather();
      }
      weatherTimer = setTimeout(() => {
        getWeather();
      }, moment(new Date()).add(1, 'H').set(
          {minute: '01', second: '00', millisecond: '000'}) - moment(
          new Date()))
    }
  };

  useEffect(() => {
    startWeather();
    return () => {
      clearTimeout(weatherTimer)
    }
  }, []);

  const userMenu = (
      <Menu>
        <Menu.Item>
          <SettingOutlined/>
          个人设置
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item onClick={shutDown}>
          <LogoutOutlined/>
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
            <TabPane tab={<span>消息&nbsp;&nbsp;({bell.message})</span>} key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab={<span>代办&nbsp;&nbsp;({bell.commission})</span>}
                     key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </Menu>
  );

  const drawerClose = () => {
    setDrawerVisible(false);
  }

  return (
      <Header className="header">
        <div>
          {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: trigger,
              })}
        </div>
        <Drawer
            className="header-drawer"
            title="更多"
            drawerStyle={{backgroundColor: '#001529'}}
            closable={false}
            onClose={drawerClose}
            placement="left"
            visible={drawerVisible}
        >
          <LeftNav collapsed={false}/>
        </Drawer>
        <div className="header-index-right">
          <div className="header-weather">
            <Tooltip placement="bottom" title={<>地点<span
                style={{marginLeft: '4rem'}}>{weather.basic.city}</span> <br/>更新时间<span
                style={{marginLeft: '2rem'}}> {weather.basic.update.loc}</span><br/>数据由京东万象提供每小时更新一次</>}>
              <span>{weather.now.cond.txt} </span>
              <span>{weather.now.tmp}℃</span>
            </Tooltip>
          </div>
          <div className="header-nowDate">
            <NowDate/>
          </div>
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <div className="header-message-icon">
              <Badge count={bell.notice + bell.message + bell.commission || 0}
                     overflowCount={99}>
                <BellOutlined/>
              </Badge>
            </div>
          </Dropdown>
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className="header-index-user">
              <Avatar size="small"
                      src="http://img.fhxasdsada.xyz/iduyadfgjdekldjhf.png"/>
              <span>{user.username}</span>
            </div>
          </Dropdown>
        </div>
      </Header>
  )
}

const stateToProps = (state) => {
  return {
    user: state.user,
  }
}
const dispatchToProps = (dispatch) => {
  return {
    setUser(data) {
      dispatch(ActionCreators.setUser(data))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(HeaderNav);