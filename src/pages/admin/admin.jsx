import React, {createContext, useEffect, useState} from "react";
import {Layout} from "antd";
import LeftNav from "../../components/left-naw/left-nav";
import HeaderNav from "../../components/header/header";
import {GithubOutlined} from "@ant-design/icons";
import './admin.less'
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom'
import routerList from '../../config/routerConfig'

import {connect} from 'react-redux'
import menuList from "../../config/menuConfig";

export const CountContext = createContext();
const {Footer, Sider, Content} = Layout;

const Admin = (props) => {
  const history = useHistory()
  let {user} = props

  if (!user || !user._id) {
    history.replace("/login")
  }
  const [collapsed, setCollapsed] = useState(false)

  const collapsedNav = () => {
    const width = document.body.clientWidth
        || document.documentElement.clientWidth
    if (width <= 1200) {
      return setCollapsed(true)
    }
    setCollapsed(false)
  }

  const routerAuth=(menuList)=>{
    const menus=user.role.menus
    return (
        <Switch> {/*只匹配其中一个*/}
          {
            menuList.map(item=>{
              if (menus.indexOf(item.path)!==-1 || user.username==='admin'){
                return (
                      <Route path={item.path}>
                        {item.component}
                      </Route>
                )
              }
            })
          }
          <Redirect to="/home"/>
        </Switch>
    )


  }

  useEffect(() => {
    window.addEventListener('resize', collapsedNav)
    return () => {
      window.removeEventListener('resize', collapsedNav)
    }
  })


  return (
      <Layout className="admin">
        <Sider trigger={null} collapsible={true} collapsed={collapsed}
               className="admin-sider">
          <LeftNav collapsed={collapsed}/>
        </Sider>
        <Layout>
          <CountContext.Provider value={{collapsed, setCollapsed}}>
            <HeaderNav/>
          </CountContext.Provider>
          <Content className="Content">
            {routerAuth(routerList)}
            <Footer>
              <div className="footer">
                <div>
                  <a href="https://github.com/liumuge">MuGe</a>
                  <a href="https://github.com/liumuge/SmallProfitMall">
                    <GithubOutlined/>
                  </a>
                  <a href="https://github.com/fhx210114">FF</a>
                </div>
                <div>A world that knows nothing will surprise you if you go on
                </div>
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
  )

}

const stateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(stateToProps, null)(Admin);
