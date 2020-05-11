import Home from "../pages/home/home";
import Category from "../pages/category/category";
import Product from "../pages/product/product";
import Role from "../pages/role/role";
import User from "../pages/user/user";
import Analysis from "../pages/dashboard/analysis";
import Monitor from "../pages/dashboard/monitor";
import Order from "../pages/order/order";
import React from "react";

const routerList = [
  {
    path: '/home',
    component: <Home/>,
  }, {
    path: '/products/category',
    component: <Category/>,
  }, {
    path: '/products/product',
    component: <Product/>,
  }, {
    path: '/role',
    component: <Role/>,
  }, {
    path: '/user',
    component: <User/>,
  }, {
    path: '/dashboard/analysis',
    component: <Analysis/>,
  }, {
    path: '/dashboard/monitor',
    component: <Monitor/>,
  }, {
    path: '/order',
    component: <Order/>,
  },
]
export default routerList