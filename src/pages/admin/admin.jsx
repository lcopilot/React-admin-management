import React, {createContext, useState} from "react";
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
import Product from "../product/product";
import Category from "../category/category";
import User from "../user/user";
import Role from "../role/role";
import Home from "../home/home";
import Monitor from "../dashboard/monitor";
import Analysis from "../dashboard/analysis";
import Order from "../order/order";
import {connect} from 'react-redux'
export const CountContext = createContext();
const {Footer, Sider, Content} = Layout;

const Admin = (props) => {
  const history = useHistory()
  let {user} =props

  if (!user || !user._id) {
    history.replace("/login")
  }
  const [collapsed, setCollapsed] = useState(false)

  return (
      <Layout style={{height: '100%'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LeftNav collapsed={collapsed}/>
        </Sider>
        <Layout>
          <CountContext.Provider value={{collapsed, setCollapsed}}>
            <HeaderNav/>
          </CountContext.Provider>
          <Content className="Content">
            <Switch> {/*只匹配其中一个*/}
              <Route path='/home'>
                <Home/>
              </Route>
              <Route path='/products/category'>
                <Category/>
              </Route>
              <Route path='/products/product'>
                <Product/>
              </Route>
              <Route path='/role'>
                <Role/>
              </Route>
              <Route path='/user'>
                <User/>
              </Route>
              <Route path='/dashboard/analysis'>
                <Analysis/>
              </Route>
              <Route path='/dashboard/monitor'>
                <Monitor/>
              </Route>
              <Route path='/order'>
                <Order/>
              </Route>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer>
            <div className="footer">
              <div>
                <a href="https://github.com/liumuge">MuGe</a>
                <a href="https://github.com/liumuge/SmallProfitMall">
                  <GithubOutlined/>
                </a>
                <a href="https://github.com/fhx210114">FF</a>
              </div>
              <div>A world that knows nothing will surprise you if you go on</div>
            </div>
          </Footer>
        </Layout>
      </Layout>
  )

}

const stateToProps=(state)=>{
  return {
    user:state.user,
  }
}


export default connect(stateToProps,null)(Admin);
