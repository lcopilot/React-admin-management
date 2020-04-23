import React, { useState} from "react";
import './left-nav.less'
import {Menu} from "antd";
import {Link} from 'react-router-dom'
import logo from '../../pages/login/images/logo-1.png'
import {useLocation} from "react-router-dom";
import menuList from "../../config/menuConfig";



const {SubMenu} = Menu;
const LeftNav = ({collapsed}) => {
  const location = useLocation();

  const [openKey,setOpenKey]=useState('')
  // let [menuNodes,setMenuNodes]=useState()

  /*
  * 根据menu 的数据数组生成对应的标签数组
  */
  /*
  使用map() + 递归调用
  */
 /* const  getMenuNodes_map=(menuList)=>{
    return menuList.map(item=>{
      if (!item.children){
        return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                {React.createElement(item.icon)}
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
        )
      }else {
        let cItem
        if (!openKey){
          cItem = item.children.find(cItem => location.pathname.indexOf(cItem.key)===0)
        }
        // 如果存在, 说明当前item的子列表需要打开
        if (!openKey && cItem) {
          setOpenKey(item.key)
        }
        return (
            <SubMenu
                key={item.key}
                title={
                  <span>
               {React.createElement(item.icon)}
               <span>{item.title}</span>
              </span>
                }
            >
              {getMenuNodes_map(item.children)}
            </SubMenu>
        )
      }
    })
  }*/
  /*
  使用reduce() + 递归调用
  */
  const  getMenuNodes=(menuList)=>{
    return menuList.reduce((pre,item)=>{
      //向pre 添加 <Menu.Item>
      if (!item.children){
        pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                {React.createElement(item.icon)}
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
        ))
      }else{
        let cItem
        if (!openKey){
           cItem = item.children.find(cItem => location.pathname.indexOf(cItem.key)===0)
        }
        // 如果存在, 说明当前item的子列表需要打开
        if (!openKey && cItem) {
          setOpenKey(item.key)
        }
        pre.push((
            <SubMenu
                key={item.key}
                title={
                  <span>
              {React.createElement(item.icon)}
                    <span>{item.title}</span>
              </span>
                }
            >
              {getMenuNodes(item.children)}
            </SubMenu>
        ))
      }
    return pre
    },[])
  }

  // useEffect(()=>{
  //   setMenuNodes(getMenuNodes(menuList))
  // })

  const menuNodes=getMenuNodes(menuList)


  return (
      <div className="left-nav">
        <Link to="/" className="logo">
          <img src={logo} alt="logo"/>
          <h2 style={collapsed ? {display: 'none'} : {}}>Small Profit</h2>
        </Link>
        <Menu
            defaultOpenKeys={[`${openKey}`]}
            selectedKeys={[`${location.pathname}`]}
            mode="inline"
            theme="dark"
        >
          {
            menuNodes
          }
        </Menu>

      </div>
  )
}

export default LeftNav