import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import cuid from 'cuid';

const TimeSpent = props => {
  // const COLORS = ['#0088FE', '#00C49F']
  // const pie = (
  //   <Pie
  //     data={props.data}
  //     dataKey='time'
  //     nameKey='name'
  //     outerRadius={50}
  //     fill="#8884D8"
  //     cx='50%'
  //     cy='50%'
  //   >
  //     {props.data.map((entry, idx) => (<Cell key={cuid()} fill={COLORS[idx % COLORS.length]} /> ))}
  //   </Pie>
  // )
  // const XTCOLORS = ["#FF0000", "#FFFFFF"]
  // const xtPie = props.xtData ?
  //   (
  //     <Pie
  //       data={props.xtData}
  //       dataKey='time'
  //       nameKey='name'
  //       innerRadius={60}
  //       outerRadius={80}
  //       fill="#999999"
  //     >
  //       {props.data.map((entry, idx) => <Cell key={cuid()} fill={XTCOLORS[idx % XTCOLORS.length]} /> )}
  //     </Pie>
  //   ) : null
  return (
    <PieChart width={300} height={200}>
      <Legend />
    </PieChart>
  )
}

TimeSpent.defaultProps = {
  data: [{}, {}],
  xtData: [{}, {}]
}

export default TimeSpent
