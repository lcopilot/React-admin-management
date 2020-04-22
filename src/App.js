import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";


export default function App() {
  return (
      <BrowserRouter>
        <Switch> {/*只匹配其中一个*/}
          <Route path='/login' component={Login}></Route>
          <Route path='/'  component={Admin}></Route>
        </Switch>
      </BrowserRouter>
  )
}