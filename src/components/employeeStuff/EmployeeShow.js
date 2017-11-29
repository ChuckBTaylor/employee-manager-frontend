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
      Is Admin? <i style={{color: props.employee.isAdmin ? 'green' : 'red'}} className={props.employee.isAdmin ? 'checkmark box icon' : "remove circle outline icon"} />
      <br />
      <Button onClick={handleEditClick} >Edit {props.employee.name} </Button>
      <Button onClick={handleDeleteClick} > Delete {props.employee.name} </Button>
  </div>
  )
}


export default EmployeeShow
