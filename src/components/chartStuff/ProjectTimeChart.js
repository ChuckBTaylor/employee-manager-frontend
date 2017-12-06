import React from 'react';
import { BarChart, YAxis, XAxis, Legend, Bar, Tooltip } from 'recharts';

const ProjectTimeChart = props => {
  const handleMouseEnter = (ev, data, something) => {
    console.log("ev", ev)
    console.log('data', data.target)
    console.log('something', something);
  }

  const handleMouseClick = (ev, data, something) => {
    console.log("ev", ev)
    console.log('data', data.target)
    console.log('something', something);
  }

  return (
    <div className='four wide column'>
      <BarChart width={200} height={300} data={props.chartData} onClick={handleMouseClick}>
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
