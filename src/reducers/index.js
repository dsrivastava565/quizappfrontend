import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './erroReducer';

export default combineReducers({
    auth:authReducer,
    errors:errorReducer
});