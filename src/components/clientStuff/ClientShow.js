import React from 'react';
import { Button } from 'semantic-ui-react';

const ClientShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }

  return (
  <div className='six wide column'>
    {props.client.name}<br />
    <Button onClick={handleEditClick}>Edit {props.name}</Button>
    <Button onClick={handleDeleteClick}>Delete {props.name}</Button>
  </div>
  )
}

ClientShow.defaultProps = {

}

export default ClientShow
