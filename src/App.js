import React, { Component } from 'react';
import './App.css';
import ScheduleContainer from './containers/ScheduleContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import ProductContainer from './containers/ProductContainer';
import { Route } from 'react-router';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';

class App extends Component {

  state = {
    visible: false
  }

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  handleScheduleClick = () => {
    this.props.history.push('/schedules')
  }

  handleEmployeeClick = () => {
    this.props.history.push('/employees')
  }

  handleProductClick = () => {
    this.props.history.push('/products')
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Menu</Button>
        <Sidebar.Pushable as={Segment} >
          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted >
            <Menu.Item name='Schedules' onClick={this.handleScheduleClick}>
              <Icon name='calendar' />
              Schedules
            </Menu.Item>
            <Menu.Item name='Employees' onClick={this.handleEmployeeClick}>
              <Icon name='users' />
              Employees
            </Menu.Item>
            <Menu.Item name="Products" onClick={this.handleProductClick}>
              <Icon name='archive' />
              Products
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              {/*}<Header as='h3'>Application Content</Header>
              Will have to import Header from semantic UI react*/}
              <Route path='/schedules' component={ScheduleContainer} />
              <Route path='/employees' component={EmployeeContainer} />
              <Route path='/products' component={ProductContainer} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

// const mapStateToProps = () => {}

export default App;
