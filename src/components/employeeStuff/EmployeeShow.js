import React from 'react';
import { Button } from 'semantic-ui-react';

const EmployeeShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }

  return (
  <div className='six wide column'>
      Name: {props.employee.name}<br />
      Schedule Color: <i style={{color: props.employee.scheduleColor}} className="circle icon"></i><br />
      <Button onClick={handleEditClick} >Edit {props.employee.name} </Button>
      <Button onClick={handleDeleteClick} > Delete {props.employee.name} </Button>
  </div>
  )
}


export default EmployeeShow
