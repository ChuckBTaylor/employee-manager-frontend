import React from 'react';
import UserContainer from './containers/UserContainer';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import { authorize } from './HOCs/authorize';

const App = props => {

    const authApp = authorize(AppContainer)
    const authUser = authorize(UserContainer)
    return (
      <div className='main-div'>
        <Switch>
          <Route path='/login' component={authUser} />
          <Route path='/logout' component={authUser} />
          <Route path='/' component={authApp} />
        </Switch>
      </div>
    )
}


export default App;
