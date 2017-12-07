import React from 'react';
import PieceRows from '../components/spreadStuff/PieceRows';
import cuid from 'cuid';

const ProcedureSpread = props => {
  console.log(props);
  const pieceRows = props.data.pieces.map(piece => {
    const procedures = props.data.procedures.filter(procedure => procedure.pieceID === piece.id)
    return (
      <PieceRows piece={piece} procedures={procedures} key={cuid()} />
    )
  })
  console.log(pieceRows);
  return (
    <table className="top aligned">
      <thead><tr><th>Piece</th><th>Process</th><th>Bid Total</th><th>Actual</th></tr></thead>
      {pieceRows}
    </table>
  )
}

ProcedureSpread.defaultProps = {
  data: {pieces: [], procedures: []}
}

export default ProcedureSpread
