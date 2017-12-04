import React from 'react';
import cuid from 'cuid';

const ColumnHeaders = props => {

  const columns = props.columns.map(column => (<th key={cuid()} >
  {props.autoFormat ? column.name.replace(/[A-Z]/, match => ` ${match.toLowerCase()}`) : column.name}
  </th>))
  return (
  <tr>
    {props.hasEmptyTopLeft ? <th colSpan={props.rowHeadersLength - 2}> Key </th> : null}
    {columns}
  </tr>
  )
}

ColumnHeaders.defaultProps = {
  columns: [{
    key: "",
    name: "",
    width: 100
  }, {}],
  autoFormat: true,
  hasEmptyTopLeft: false,
  rowHeadersLength: 0
}

export default ColumnHeaders
