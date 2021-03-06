import React from 'react';
import cuid from 'cuid';
import PieceCard from './PieceCard';

const PieceList = props => {
  const pieces = props.pieces.map(piece => (<PieceCard key={cuid()} piece={piece} onSelectPiece={props.onSelectPiece} />))
  return (
  <div className="four wide column" >
    <h2>Active Pieces</h2>
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
