import React from 'react';
import cuid from 'cuid';

const LabelRow = props => {
  const headers = props.labels.filter(key => key !== 'id').map(key => (<th key={cuid()}><h3>{key}</h3></th>))
  return ( //Sub Headers (name, estimatedTime, complete)
  <tr>
    {headers}
    {/*}<th><h3>Alotted Time</h3></th>*/}
    <th colSpan={props.employeeCount}><h3>Employee Hours Spent</h3></th>
    <th><h3>Sum</h3></th>
  </tr>
  )
}

LabelRow.defaultProps = {
  labels: [],
  employeeCount: 0
}

export default LabelRow
