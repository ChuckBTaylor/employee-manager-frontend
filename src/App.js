import React, { Component } from 'react';
import UserContainer from './containers/UserContainer';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import { authorize } from './HOCs/authorize';
import { connect } from 'react-redux'

const App = props => {

    const authApp = authorize(AppContainer)
    const authUser = authorize(UserContainer)
    return (
      <div>
        <Switch>
          <Route path='/login' component={authUser} />
          <Route path='/logout' component={authUser} />
          <Route path='/' component={authApp} />
        </Switch>
      </div>
    )
}


export default App;
