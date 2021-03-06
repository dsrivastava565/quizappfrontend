import React,{ Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router,Route }  from 'react-router-dom';
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
if(localStorage.authtoken){

  setAuthToken(localStorage.authtoken);
  const currentuser = JSON.parse(localStorage.userdata);
  
  store.dispatch(setCurrentUser(currentuser));

   

}

class App extends Component {
  render(){
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
    <Navbar/>
    <Route exact path="/quizappfrontend/" component = {Landing}/>
     <div className="container">
     <Route exact path="/register" component={Register}/>
     <Route exact path="/login" component={Login}/>
     </div>
     <Footer/>
    </div>
    </Router>
    </Provider>
  );
}
}
export default App;
