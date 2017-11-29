import React from 'react';
import { Button } from 'semantic-ui-react';
import cuid from 'cuid';


const PieceShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }
  const serviceNames = props.services.map(service => (<li key={cuid()}>{service.name}</li>))
  return (
  <div>
    <h2>{props.project.name}</h2>
    <h4>{props.piece.name}</h4>
    <p>Services:</p>
    <ul>
      {serviceNames}
    </ul>
    <Button onClick={handleEditClick} > Edit </Button>
    <Button onClick={handleDeleteClick} > Delete </Button>
  </div>
  )
}

PieceShow.defaultProps = {

}

export default PieceShow
