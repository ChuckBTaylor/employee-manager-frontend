import React from 'react';
import { Redirect } from 'react-router-dom';

const LogOutComponent = props => {
  props.onLogOut()
  return (
  <div>
    Thanks for visiting the app! You're the best!
    <Redirect to='/login' />
  </div>
  )
}

export default LogOutComponent
