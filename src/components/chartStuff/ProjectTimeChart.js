import React from 'react';
import { BarChart, YAxis, Legend, Bar } from 'recharts';

const ProjectTimeChart = props => {

  return (
    <div className='six wide column'>
      <BarChart width={200} height={300} data={props.chartData} label >
        <YAxis />
        <Bar dataKey='totalEst' fill="#0000ff" label />
        <Bar dataKey='totalWorked' fill={props.safe ? "#00FF00" : "#FF0000"} label/>
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
