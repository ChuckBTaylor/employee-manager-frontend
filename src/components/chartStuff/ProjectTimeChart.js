import React from 'react';
import { BarChart, YAxis, Legend, Bar } from 'recharts';

const ProjectTimeChart = props => {

  return (
    <div className='four wide column'>
      <BarChart width={200} height={300} data={props.chartData} >
        <YAxis />
        <Bar dataKey='totalEst' fill="#0000ff"/>
        <Bar dataKey='totalWorked' fill={props.safe ? "#00FF00" : "#FF0000"}/>
        <Legend verticalAlign='top' height={36} />
      </BarChart>
    </div>
  )
}

ProjectTimeChart.defaultProps = {
  chartData: [{}],
  safe: true
}

export default ProjectTimeChart
