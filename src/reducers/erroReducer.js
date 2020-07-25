import {GET_ERRORS} from '../actions/types'

const intitalState ={
}
export default function(state = intitalState,action){
switch(action.type){
    case GET_ERRORS:
    return action.payload
    
    default:
    return state;
}

}