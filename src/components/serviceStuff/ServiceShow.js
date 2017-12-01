import React from 'react';
import { Button } from 'semantic-ui-react';

const ServiceShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }

  return (
  <div className='six wide column'>
    <h2>{props.service.name}</h2><br />
    <p>Default Time: {props.service.defaultTime} hours</p>
    <Button onClick={handleEditClick}>Edit {props.name}</Button>
    <Button onClick={handleDeleteClick}>Delete {props.name}</Button>
  </div>
  )
}

ServiceShow.defaultProps = {
  service: {
    name: "",
    defaultTime: 0
  }
}

export default ServiceShow
