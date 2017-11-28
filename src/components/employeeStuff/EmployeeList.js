import React from 'react';
import cuid from 'cuid';
import EmployeeCard from './EmployeeCard';

const EmployeeList = props => {
  const employeeList = props.employees.map(employee => <EmployeeCard key={cuid()} employee={employee} onSelectEmployee={props.onSelectEmployee} key={employee.id} />)
  return (
  <div className='four wide column'>
    <ul>
      {employeeList}
    </ul>
  </div>
  )
}

export default EmployeeList
