import React from 'react';

const EmployeeList = (props) => {
  const employeeList = props.employees.map(employee => (<li key={employee.cuid}>{employee.name}</li>))
  return (
  <ul>
    {employeeList}
  </ul>
  )
}

export default EmployeeList
