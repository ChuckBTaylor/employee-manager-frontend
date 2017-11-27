import React from 'react';
import PieceCard from './PieceCard';

const PieceList = props => {
  const pieces = props.pieces.map(piece => (<PieceCard key={piece.cuid} piece={piece} onSelectPiece={props.onSelectPiece} />))
  return (
  <div className="four wide column" >
    <ul>
      {pieces}
    </ul>
  </div>
  )
}

PieceList.defaultProps = {
  pieces: []
}

export default PieceList
