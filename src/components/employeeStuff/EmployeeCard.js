import React from 'react';

const EmployeeCard = (props) => {

  const handleClick = ev => {
    props.onSelectEmployee(props.employee)
  }

  return (
  <li onClick={handleClick}>
    {props.employee.name}<i className='circle icon' style={{color: props.employee.scheduleColor}} />
  </li>
  )
}

export default EmployeeCard
