import React from 'react';
import cuid from 'cuid';

const ColumnHeaders = props => {


  const columns = props.columns.map(column => (<th key={cuid()} >
  {props.autoFormat ? column.name.replace(/[A-Z]/, match => ` ${match.toLowerCase()}`) : column.name}
  </th>))

  return (
  <tr>
    {columns}
  </tr>
  )
}

ColumnHeaders.defaultProps = {
  columns: [{
    key: "",
    name: "",
    width: 100
  }, {}]
}

export default ColumnHeaders
