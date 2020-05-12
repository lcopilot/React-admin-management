import *as  actionTypes from './actionTypes'
import update from 'immutability-helper';


const defaultState={

}

export default (state=defaultState,action)=>{
    switch (action.type) {
        case actionTypes.SET_USER:
            return update(state, {
                user:{
                   $set:action.data
                }
            })
        case actionTypes.SET_USER_AUTH:
            return update(state, {
                userAuth:{
                   $set:action.data
                }
            })
        default:
            return state
    }
}