import {combineReducers} from 'redux'
import userReducer from './User/user.reducers'

export default combineReducers({
    user:userReducer
})