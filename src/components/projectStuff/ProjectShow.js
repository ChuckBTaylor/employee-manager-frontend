import React from 'react';
import PieceList from '../pieceStuff/PieceList';
import { Button } from 'semantic-ui-react';

const ProjectShow = props => {

  const handleEditClick = ev => {
    props.onEditClick()
  }

  const handleDeleteClick = ev => {
    props.onDeleteClick()
  }


  const pieces = props.pieces.map(piece => (<li key={piece.id}>{piece.name}</li>))
  return (
  <div className='six wide column'>
    <h2>{props.client.name}</h2>
    {props.project.name}
    <br />
    {props.pieces.length > 0 ? <PieceList pieces={props.pieces} onSelectPiece={props.onSelectPiece}/> : null}
    <Button onClick={handleEditClick} > Edit </Button>
    <Button onClick={handleDeleteClick} > Delete </Button>
  </div>
  )
}

ProjectShow.defaultProps = {

}

export default ProjectShow
