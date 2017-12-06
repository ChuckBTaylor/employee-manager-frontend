import React, { Component } from 'react';
import cuid from 'cuid';
class ClientCard extends Component {

  state = {
    name: ""
  }

  handleProjectClick = ev => {
    console.log(ev.target.dataset)
    this.props.onSelectProject(+ev.target.dataset.projectID)
  }

  handleProjectChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleAddProjectClick = () => {
    this.props.onCreateProject({...this.state, clientID: this.props.client.id})
    this.setState({name: ""})
  }

  isEnter = ev => {
    if(ev.which === 13 && this.state.name !== ""){
      this.handleAddProjectClick()
    }
  }

  handleClientClick = () => {
    this.props.onSelectClient(this.props.client)
  }


  render(){
    return (
      <div className='four wide column'>
        <h2 onClick={this.handleClientClick}>{this.props.client.name}</h2>
        <h3>Current Projects</h3>
        <div className='ui middle aligned selection list'>
          {this.props.projects.filter(project => project.clientID === this.props.client.id).map(project => {
            return(
              <div className='item' key={cuid()}>
                <i className='shipping' />
                <div className='content'>
                  <div className='header' data-project-i-d={project.id} onClick={this.handleProjectClick}>{project.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <input type='text' size='15' placeholder='New Project' value={this.state.name} onChange={this.handleProjectChange} onKeyDown={this.isEnter}/>
        <i onClick={this.handleAddProjectClick} className='plus square outline icon'/>
      </div>
    )
  }
}

ClientCard.defaultProps = {
  client: {},
  projects: []
}

export default ClientCard
