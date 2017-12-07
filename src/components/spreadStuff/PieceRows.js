import React from 'react';
import ProcedureRow from './ProcedureRow';
import cuid from 'cuid';


const PieceRows = props => {
  const pieceBid = props.procedures.reduce((agg, proc) => agg + proc.bidTime, 0)
  const pieceRow = (<tr>
    <th>{props.piece.name}</th>
    <th>--></th>
    <td>{pieceBid}</td>
    <td>{props.piece.totalWorked}</td>
    </tr>)
  const proceduredRows = props.procedures.map(proc => (<ProcedureRow procedure={proc} key={cuid()} />))

  return (
  <tbody>
    {pieceRow}
    {proceduredRows}
  </tbody>
  )
}

PieceRows.defaultProps = {
  piece: {},
  procedures: [{}]
}

export default PieceRows
