import React from 'react';

const HeaderRow = props => {
  const handleXClick = ev => {
    ev.preventDefault()
    props.onXClick(props.info.id)
  }
  return (
  <tr>
    <th colSpan={props.sheetWidth - 1}><h2>{props.info.name}</h2></th>
    <td onClick={handleXClick}><i className='remove icon' /></td>
  </tr>
  )
}

HeaderRow.defaultProps = {
  info: {
    name: "",
    id: -1
  },
  sheetWidth: 0,
  onXClick: id => console.log(id, " from the Headrow Component")
}

export default HeaderRow
