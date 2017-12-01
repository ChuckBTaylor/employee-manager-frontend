import React from 'react';

const HeaderRow = props => {
  return (
  <tr>
    <th colSpan={props.sheetWidth}><h2>{props.text}</h2></th>
  </tr>
  )
}

HeaderRow.defaultProps = {
  text: "",
  sheetWidth: 0
}

export default HeaderRow
