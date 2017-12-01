import React from 'react';
import cuid from 'cuid';
import RowData from '../spreadsheetStuff/RowData';

const InfoRow = props => {

  const rowHeaders = props.labels.map(label => (
    <th key={cuid()}>
    {typeof(props.procedure[label]) === 'boolean' ? (<i className={props.procedure[label] ? 'checkmark icon' : 'remove icon'} style={{color: props.procedure[label] ? 'green' : 'red'}} />) : props.procedure[label]}
    </th>
  ))
  let inputRows = []
  for (let i = 0; i < props.employeeCount + 1; i++) {
    inputRows.push(<td key={cuid()}><input size='5' type="text"/></td>)
  }
  const sumCell = (<td>Sum Number</td>)
  return (
  <tr>
    {rowHeaders}
    {inputRows}
    {sumCell}
  </tr>
  )
}

InfoRow.defaultProps = {
  labels: [],
  procedure: {},
  employeeCount: 0,
  cellContents: [{}, {}] //array of operation objects
}

export default InfoRow
