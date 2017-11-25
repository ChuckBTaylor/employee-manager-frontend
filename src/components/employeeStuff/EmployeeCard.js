import React from 'react';

const EmployeeCard = (props) => {

  const handleClick = ev => {
    props.onSelectEmployee(props.employee)
  }

  return (
  <li onClick={handleClick}>
    {props.employee.name}
  </li>
  )
}

export default EmployeeCard
