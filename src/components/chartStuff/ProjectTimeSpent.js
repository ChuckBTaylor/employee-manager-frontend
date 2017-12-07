import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import cuid from 'cuid';
import { randomColorArray } from '../../helpers/generalHelpers';

const ProjectTimeSpent = props => {
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
      label
    >
      {props.data.map((entry, idx) => (<Cell key={cuid()} fill={COLORS[idx % COLORS.length]} /> ))}
    </Pie>
  )

  return (
    <div>
      <h2>{props.project.name}</h2>
      <PieChart width={250} height={250}>
        <Legend />
        {pie}
      </PieChart>
    </div>
  )
}

ProjectTimeSpent.defaultProps = {
  data: [{}, {}],
  project: {}
}

export default ProjectTimeSpent
