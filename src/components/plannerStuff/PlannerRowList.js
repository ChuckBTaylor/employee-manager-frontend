import React from 'react';
import cuid from 'cuid';
import HeaderRow from './HeaderRow';
import LabelRow from './LabelRow';
import InfoRow from './InfoRow';


const PlannerRowList = props => {
  const labels = props.blockHeaders.procedures.length > 0 ? Array.from(Object.keys(props.blockHeaders.procedures[0])) : []
  const infoRows = props.blockHeaders.procedures.length > 0 ? props.blockHeaders.procedures.map((procedure, rowNum) => {
    const filteredCellContents = props.cellContents.filter(cell => cell.procedureID === procedure.id)
    return (
      <InfoRow key={cuid()}
        labels={labels}
        procedure={procedure}
        employeeCount={props.employeeCount}
        cellContents={props.cellContents}
        rowNum={rowNum}
        employeeIDs={props.employeeIDs}
        onTDC={props.onTDC}
      />
    )
  }) : null
  const projectInfo = {name: props.blockHeaders.name, id: props.blockHeaders.id}
  return (
  <tbody>
    <HeaderRow info={projectInfo} sheetWidth={props.sheetWidth} onXClick={props.onXClick} />
    <LabelRow labels={labels} employeeCount={props.employeeCount} />
    {infoRows}
  </tbody>
  )
}

PlannerRowList.defaultProps = {
  blockHeaders: {
    name: "", //projectName
    id: -1,
    procedures: [
      {
        name: "",
        estimatedTime: 0.00,
        complete: false,
        id: -1
      }
    ]
  },
  cellContents: [{}],
  sheetWidth: 0,
  employeeCount: 0,
  onXClick: id => console.log(id, "from the PlannerRowList component"),
  blockNumber: -1, //Used to find which input has been editted
  employeeIDs: [], //Array of names for colName
  onTDC: data => console.log(data, "from the PlannerRowList")
}

export default PlannerRowList
