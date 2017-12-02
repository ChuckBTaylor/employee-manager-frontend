import React from 'react';
import cuid from 'cuid';
import RowData from '../spreadsheetStuff/RowData';
import TableFloat from '../spreadsheetStuff/TableDataTypes/TableFloat';

const InfoRow = props => {
  const filteredLabels = props.labels.filter(label => label !== 'id')
  const rowHeaders = filteredLabels.map((label, colnum) => (
    <th key={cuid()}>
      {typeof(props.procedure[label]) === 'boolean' ?
      (<i
        colnum={colnum}
        className={props.procedure[label] ? 'checkmark icon' : 'remove icon'}
        style={{color: props.procedure[label] ? 'green' : 'red'}}
      />) :
      props.procedure[label]}
    </th>
  ))
  let inputRows = []
  let sum = 0
  for (let i = 0; i < props.employeeCount + 1; i++) { // +1 [ALLOTTED_TIME x x x x x sum]
    const procedureOperations = props.cellContents.filter(cell => cell.procedureID === props.procedure.id)
    const operation = procedureOperations.find(cell => cell.employeeID === props.employeeIDs[i])
    const data = operation ? operation.hours : ""
    sum = procedureOperations.reduce((agg, cell) => agg + cell.hours, 0)
    inputRows.push(
      <TableFloat
        onTDC={props.onTDC}
        cPos={props.cPos}
        aRow={props.aRow}
        aCol={props.aCol}
        rowNum={props.rowNum}
        colNum={i}
        colName={props.employeeIDs[i]}
        key={cuid()}
        data={data}
      />
    )
  }

  const sumCell = (<th>{sum}</th>)
  return (
  <tr>
    {rowHeaders}
    {inputRows}
    {sumCell}
  </tr>
  )
}

//<TableFloat cPos={props.cPos} aRow={props.aRow} aCol={props.aCol} rowNum={props.rowNum} colNum={props.colNum} colName={props.colName} id={props.id} data={props.data} onTDC={props.onTDC} />

InfoRow.defaultProps = {
  labels: ['name', 'id', 'estimatedTime', 'complete'], //array of procedure keys
  procedure: {
    name: "",
    id: -1,
    estimatedTime: 0.00,
    complete: false
  },
  employeeCount: 0,
  cellContents: [{}, {}], //array of operation objects
  onTDC: data => console.log(data),
  cPos: 0,
  aRow: 0,
  aCol: 0,
  rowNum: 0,
  data: 0,
  employeeIDs: []
}

export default InfoRow
