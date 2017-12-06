import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import cuid from 'cuid';
import { randomColorArray } from '../../helpers/generalHelpers';

const TimeSpent = props => {
  const COLORS = randomColorArray(props.data.length)
  const pie = (
    <Pie
      data={props.data}
      dataKey='time'
      nameKey='name'
      outerRadius={50}
      fill="#8884D8"
      cx='50%'
      cy='50%'
    >
      {props.data.map((entry, idx) => (<Cell key={cuid()} fill={COLORS[idx % COLORS.length]} /> ))}
    </Pie>
  )

  return (
    <PieChart width={300} height={200}>
      <Legend />
      {pie}
    </PieChart>
  )
}

TimeSpent.defaultProps = {
  data: [{}, {}]
}

export default TimeSpent
