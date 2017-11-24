import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

class NavBar extends Component{

  state = {
    visible: false
  }

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  render(){
    return(
      <div>
        <Button onClick={this.toggleVisibility}>Menu</Button>
        <Sidebar.Pushable as={Segment} >
          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted >
            <Menu.Item name='Schedules'>
              <Icon name='home' />
              <Link to='/schedules'>Schedules</Link>
            </Menu.Item>
            <Menu.Item name='Employees'>
              <Icon name='camera' />
              <Link to='/employees'>Employees</Link>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

NavBar.defaultProps = {

}

export default NavBar;
