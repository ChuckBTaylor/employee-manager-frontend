import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import scheduleReducer from './reducers/scheduleReducer';
import employeeReducer from './reducers/employeeReducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';



const rootReducer = combineReducers({schedules: scheduleReducer, employees: employeeReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



ReactDOM.render(<Provider store={store}><Router><App store={store} /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
