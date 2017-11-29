import React from 'react';
import RowData from './RowData';
import cuid from 'cuid';

const RowLine = props => {
  // const rowData = Array.from(Object.keys(props.row)).map(data => (<RowData data={props.row[data]}/>))
  const rowData = props.columns.map((column, colNum) => (<RowData colNum={colNum} rowNum={props.rowNum} key={cuid()} id={props.row.id} data={props.row[column.key]} isImmutable={column.isImmutable} onTDC={props.onTDC} colName={column.key}/>))
  return (
  <tr>
    {rowData}
  </tr>
  )
}

RowLine.defaultProps = {
 row: {},
 onTDC: ev => console.log(ev),
 rowNum: 0
}

export default RowLine
