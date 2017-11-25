import React from 'react';

const ClientCard = props => {

  const handleClick = () => {
    props.onSelectClient(props.client)
  }

  return (
  <li onClick={handleClick}>
    {props.client.name}
  </li>
  )
}

export default ClientCard
