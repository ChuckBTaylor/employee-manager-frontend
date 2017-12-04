import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import scheduleReducer from './reducers/scheduleReducer';
import employeeReducer from './reducers/employeeReducer';
import serviceReducer from './reducers/serviceReducer';
import clientReducer from './reducers/clientReducer';
import projectReducer from './reducers/projectReducer';
import pieceReducer from './reducers/pieceReducer';
import procedureReducer from './reducers/procedureReducer';
import operationReducer from './reducers/operationReducer';
import plannerReducer from './reducers/plannerReducer';
import userReducer from './reducers/userReducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';



const rootReducer = combineReducers({schedules: scheduleReducer, employees: employeeReducer, services: serviceReducer, clients: clientReducer, projects: projectReducer, pieces: pieceReducer, procedures: procedureReducer, operations: operationReducer, planners: plannerReducer, users: userReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/' render={props => (<App {...props} store={store} />)} />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
