import React from 'react';
import { Button } from 'semantic-ui-react';
import ProjectList from '../projectStuff/ProjectList';

const ClientShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }

  const handleNewProjectClick = () => {
    props.onNewProjectClick()
  }

  return (
  <div className='six wide column'>
    {props.client.name}<br />
    Current Projects:
    {props.projects.length > 0 ? <ProjectList onSelectProject={props.onSelectProject}  projects={props.projects} /> : "No Current Projects"}
    <br />
    <Button onClick={handleNewProjectClick}>New Project </Button>
    <Button onClick={handleEditClick}>Edit {props.name}</Button>
    <Button onClick={handleDeleteClick}>Delete {props.name}</Button>
  </div>
  )
}

ClientShow.defaultProps = {
  client: {
    name: "",
    projects: []
  }
}

export default ClientShow
