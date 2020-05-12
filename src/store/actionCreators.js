import *as actionTypes from './actionTypes'
import axios from 'axios'


export const setUser=(data)=>({
    type:actionTypes.SET_USER,
    data
})
export const setUserAuth=(data)=>({
    type:actionTypes.SET_USER_AUTH,
    data
})



export const getTodoList=()=>{
    return (dispatch)=>{
        axios.get('http://rap2.taobao.org:38080/app/mock/250788/test01').then(res=>{
        // dispatch(getListAction(res.data.data))
      })
    }
}
