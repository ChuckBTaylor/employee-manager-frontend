import React from 'react';

const TableImmutable = props => {
  return (
  <td>
    {props.newData}
  </td>
  )
}

TableImmutable.defaultProps = {
  newData: "",
  id: 0,
  rowNum: 0,
  colNum: 0
}

export default TableImmutable
