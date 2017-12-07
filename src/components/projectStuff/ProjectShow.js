import React from 'react';
import PieceList from '../pieceStuff/PieceList';
import { Button } from 'semantic-ui-react';
import PieceForm from '../pieceStuff/PieceForm'

const ProjectShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }

  const handleNewPieceClick = () => {
    props.onNewPieceClick()
  }

  return (
    <div className='six wide column'>
      <h2>{props.client.name}</h2>
      <h4>{props.project.name}</h4>
      {props.pieces.length > 0 ? <PieceList pieces={props.pieces} onSelectPiece={props.onSelectPiece}/> : "No Current Pieces"}
      <br />
      
      <Button onClick={handleNewPieceClick} > New Piece </Button>
      <Button onClick={handleEditClick} > Edit </Button>
      <Button onClick={handleDeleteClick} > Delete </Button>
    </div>
  )
}

ProjectShow.defaultProps = {

}

export default ProjectShow
