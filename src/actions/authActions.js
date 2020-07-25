import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {BASE_URL} from '../utils/urls';
//Register user



export const registerUser = (userData,history) => dispatch => { 
    const url = BASE_URL+"register"
    axios.post(url,userData)
    .then(res=>history.push("/login"))
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    );


};

export const loginUser = userData => dispatch => { 
    var url = BASE_URL+'login';
    axios
    .post(url,userData)
    .then(res=>{
        const { token } = res.data;
        // Set Token to  ls
        localStorage.setItem('authtoken',token);
        // Set token to auth header
        setAuthToken(token);
        url = BASE_URL+"userdata";
        axios.get(url).then(response=>{
            const {currentuser} = response.data;
            dispatch(setCurrentUser(currentuser));
            // dispatch({
            //     type:SET_CURRENT_USER,
            //     payload:currentuser
            // });
            localStorage.setItem('userdata',JSON.stringify(currentuser));


        }).catch(err=>console.log(err));

    })
    .catch(err=>
        { 
            // console.log(err.response.data)
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
    );

    };
    export const setCurrentUser = data=>{
      return{
          type:SET_CURRENT_USER,
          payload:data
      };  
    };

    export const logOutUser = ()=>dispatch=>{
        localStorage.clear();
        setAuthToken(false);
        dispatch(setCurrentUser(null));
    }


