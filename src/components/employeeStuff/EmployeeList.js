import React from 'react';
import EmployeeCard from './EmployeeCard';

const EmployeeList = props => {
  const employeeList = props.employees.map(employee => <EmployeeCard employee={employee} onSelectEmployee={props.onSelectEmployee} key={employee.id} />)
  return (
  <div className='four wide column'>
    <ul>
      {employeeList}
    </ul>
  </div>
  )
}

export default EmployeeList
