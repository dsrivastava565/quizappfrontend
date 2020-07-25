import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import{withRouter} from 'react-router-dom';
import {connect}from 'react-redux';
import {registerUser} from '../../actions/authActions';

 class Register extends Component {
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            password2:"",
            errors:{}
        };
        this.onChange= this.onChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)

    }
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
      
      }
componentWillReceiveProps(nextProps){
  if(nextProps.errors){
    this.setState({errors:nextProps.errors})
  }

}

onChange(e){
   this.setState({[e.target.name]:e.target.value}) 
}
onSubmit(e){
    e.preventDefault();
    const user = {
        username:this.state.name,
        email:this.state.email,
        password:this.state.password
    }
    if(user.password!==this.state.password2){
        this.setState({errors:{password:"Both password does not match"}})
    }else{
    this.props.registerUser(user,this.props.history);
   
    
    }
    }

    render() {
      const { errors } = this.state;
      const{ user } = this.props.auth;
    return (
    <div className="register">
    {user ? user.email : null}
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Quiz account</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input 
              type="text" 
              className={classnames("form-control form-control-lg",{'is-invalid':errors.username}) }
              placeholder="Name" 
              name="name" 
              value={this.state.name}
              onChange = {this.onChange}
              />
              {errors.username&&(<div className="invalid-feedback">{errors.username}</div>)}
            </div>
            <div className="form-group">
              <input 
              type="email"
              onChange = {this.onChange} 
              value={this.state.email} 
              className={classnames("form-control form-control-lg",{'is-invalid':errors.email}) }
              placeholder="Email Address" 
              name="email" />
              {errors.email&&(<div className="invalid-feedback">{errors.email}</div>)}
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input type="password" onChange = {this.onChange}
              value={this.state.password} className={classnames("form-control form-control-lg",{'is-invalid':errors.password}) }placeholder="Password" name="password" />
              {errors.password&&(<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div className="form-group">
              <input type="password" onChange = {this.onChange}
              value={this.state.password2} className={classnames("form-control form-control-lg",{'is-invalid':errors.password}) }placeholder="Confirm Password" name="password2" />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
        )
    }
}
Register.protoTypes={
  registerUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
};

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors:state.errors
});
export default connect(mapStateToProps,{registerUser})(withRouter(Register));
