import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
  <div>
    <Link to='/schedules'>Schedules</Link>
    <Link to='/employees'>Employees</Link>

  </div>
  )
}

export default NavBar
