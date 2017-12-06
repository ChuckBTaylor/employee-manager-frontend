import React from 'react';
import cuid from 'cuid';

const LabelRow = props => {
  const headers = Object.keys(props.procedure_info).filter(key => key !== 'complete').map(key => (<th key={cuid()}><h3>{key.toUpperCase()}</h3></th>))
  const employees = props.employees.map(emp => (<td key={cuid()}>{emp.name}</td>))
  return ( //Sub Headers (name, estimatedTime, complete)
  <tr>
    {headers}
    {employees}
    <th><h3>Sum</h3></th>

  </tr>
  )
}

LabelRow.defaultProps = {
  procedure_info: {},
  employees: []
}

export default LabelRow
