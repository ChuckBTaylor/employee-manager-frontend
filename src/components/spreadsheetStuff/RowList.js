import React from 'react';
import RowLine from './RowLine';
import cuid from 'cuid';


const RowList = props => {
  const rows = props.rows.map((row, rowNum) => (<RowLine key={cuid()} rowNum={rowNum + 1} row={row} columns={props.columns} onTDC={props.onTDC} />))

  return (
  <tbody>
    {rows}
  </tbody>
  )
}

RowList.defaultProps = {
  rows: [{
    column1Id: "",
    column2Id: "",
    column3Id: ""
  }, {}],
  columns: ["column1Name", "Column2Name"],
  onTDC: ev => (console.log(ev))
}

export default RowList
