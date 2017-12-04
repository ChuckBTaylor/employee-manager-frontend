import React, { Component } from 'react';
import LogInForm from '../components/userStuff/LogInForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInEmployee, logOutEmployee } from '../actions/employee';
import { Route } from 'react-router-dom';
import LogOutComponent from '../components/LogOutComponent';
import { authorize } from '../HOCs/authorize';
class UserContainer extends Component{

  state = {

  }

  onLogIn = employee => {
    this.props.logInEmployee(employee)
  }

  onLogOut = () => {
    this.props.logOutEmployee()
  }

  render(){
    const AuthLogIn = authorize(LogInForm)
    return(
      <div>
        <Route path='/login' render={props => (<AuthLogIn {...props} onLogIn={this.onLogIn} logInFailed={this.props.logInFailed} errorMessage={this.props.errorMessage} />)} />
        <Route path='/logout' render={() => (<LogOutComponent onLogOut={this.onLogOut} />)} />
      </div>
    )
  }
}

UserContainer.defaultProps = {
  user: {}
}

const mapStateToProps = state => {
  return {
    errorMessage: state.users.errorMessage,
    logInFailed: state.users.logInFailed,
    loggingIn: state.users.loggingIn,
    loggedIn: state.users.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logInEmployee, logOutEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
