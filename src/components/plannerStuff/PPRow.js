import React from 'react';
import OperationCell from './OperationCell';
import cuid from 'cuid';
import AllottedCell from './AllottedCell';
import RemovePP from './RemovePP';

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
  const allotted =
    <AllottedCell
      pp={props.pp}
      ppID={props.pp.id}
      cPos={props.cPos}
      onTDC={props.onTDC}
      isSelected={props.aPP === props.pp.id && props.aEmp === -1}
    />

  const sum = props.pp.operations.map(op => op.hours).reduce((agg, hours) => hours + agg, 0)
  const icon = <i className={props.pp.procedure_info.complete ? 'checkmark icon' : 'remove icon'} style={{color: props.pp.procedure_info.complete ? 'green' : 'red'}}/>

  const removePP = <RemovePP onTDC={props.onTDC} ppID={props.pp.id} />
  return (
    <tr>
      {props.piece ? (<td rowSpan={props.ppCount}>{props.piece.name}</td>) : null}
      {procedureInfo}
      {allotted}
      <td>{sum}</td>
      {inputCells}
      <th>{icon}</th>
      {removePP}
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
