import React, { useContext} from 'react'
import './header.less'
import { Layout } from 'antd';
import {MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';

import  { CountContext } from '../../pages/admin/admin'

const { Header} = Layout;


const HeaderNav=()=>{
  let {collapsed ,setCollapsed } = useContext(CountContext);
  const trigger=()=>{
    setCollapsed(!collapsed)
  }
  return(
      <Header className="header">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: trigger,
        })}
      </Header>
  )
}

export default HeaderNav