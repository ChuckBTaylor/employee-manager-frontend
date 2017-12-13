import React from 'react';

const ProcedureRow = props => {

  return (
  <tr>
    <td>/\</td>
    <td>{props.procedure.serviceName}</td>
    <td>{props.procedure.bidTime}</td>
    <td>{props.procedure.totalWorked}</td>
  </tr>
  )
}

ProcedureRow.defaultProps = {
  procedure: {}
}

export default ProcedureRow
