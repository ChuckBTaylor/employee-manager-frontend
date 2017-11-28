import React from 'react';
import { Button } from 'semantic-ui-react';


const PieceShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }

  return (
  <div>
    <h2>{props.project.name}</h2>
    <h4>{props.piece.name}</h4>
    <Button onClick={handleEditClick} > Edit </Button>
    <Button onClick={handleDeleteClick} > Delete </Button>
  </div>
  )
}

PieceShow.defaultProps = {

}

export default PieceShow
