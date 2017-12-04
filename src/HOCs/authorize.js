import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export const authorize = (SomeComponent) => {
  return(
    class extends Component{

      loggedIn = () => {
          const jwt = localStorage.getItem('jwtToken')
          if(jwt){
            return jwt.split('.').length === 3
          } else {
            return false
          }

      }

      render(){
        const { pathname } = this.props.location
        if(this.loggedIn() && (pathname === '/login' || pathname === '/signup')){
          return (<Redirect to='/weeklyPlanner' />)
        }
        if(!this.loggedIn() && (pathname !== '/login')){
          if(pathname === '/signup'){
            return (<SomeComponent {...this.props} />)
          }
          return (<Redirect to='/login' />)
        }
        return (<SomeComponent {...this.props} />)
      }
    }
  )
}
