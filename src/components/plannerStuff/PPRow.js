import React from 'react';
import InfoRow from './InfoRow';
import OperationCell from './OperationCell';
import cuid from 'cuid';

const PPRow = props => {
  const procedureInfo = props.labels.map(label => (<td key={cuid()}>{props.pp.procedure_info[label]}</td>))

  const inputCells = props.employees.map(emp => {
    const filtered = props.pp.operations.filter(op => op.employeeID === emp.id)
    const operation = filtered.length === 1 ? filtered[0] : null
    return (
      <OperationCell
        operation={operation}
        employeeID={emp.id}
        ppID={props.pp.id}
        cPos={props.cPos}
        isSelected={(props.aEmp === emp.id) && (props.aPP === props.pp.id)}
        key={cuid()}
        onTDC={props.onTDC}
      />
    )

  })

  return (
    <tr>
      {props.piece ? (<td rowSpan={props.ppCount}>{props.piece.name}</td>) : null}
      {procedureInfo}
      <td>0</td>
      <td>Sum Cell</td>
      {inputCells}
      <td>Complete?</td>
    </tr>
  )
}

PPRow.defaultProps = {
  pp: {},
  piece: {}, //or null
  ppCount: 0,
  aEmp: -1,
  aPP: -1,
  cPos: 0,
  employees: [],
  labels: [],
  onTDC: ev => console.log(ev, 'onTDC from PPRow')
}

export default PPRow
