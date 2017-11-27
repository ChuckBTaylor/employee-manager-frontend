import React from 'react';

const PieceCard = props => {

  const handleClick = () => {
    props.onSelectPiece(props.piece)
  }

  return (
  <li onClick={handleClick}>
    {props.piece.name}
  </li>
  )
}

PieceCard.defaultProps = {
  piece: {}
}

export default PieceCard
