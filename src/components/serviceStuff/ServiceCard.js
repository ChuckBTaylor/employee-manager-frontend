import React from 'react';

const ServiceCard = props => {

  const handleClick = () => {
    props.onSelectService(props.service)
  }

  return (
  <li onClick={handleClick}>
    {props.service.name}
  </li>
  )
}

export default ServiceCard
