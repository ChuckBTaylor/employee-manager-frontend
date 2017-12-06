import React from 'react';
import cuid from 'cuid';
import PPRow from './PPRow';


const PlannerRowList = props => {

  const onTDC = data => {
    props.onTDC({...data, projectID: props.blockID})
  }
  const rowSpan = props.pieces.length + props.pps.length
  const labels = Object.keys(props.pps[0].procedure_info).filter(key => key !== 'complete')
  const labelCells = labels.map(key => (<th key={cuid()}>{` ${key.toUpperCase()} `}</th>))
  const employees = props.employees.map(emp => (<td key={cuid()}>{emp.name}</td>))

  const ppRows = []
  props.pieces.forEach(piece => {
    const pps = props.pps.filter(pp => pp.pieceID === piece.id)
    pps.forEach((pp, idx) => {
      ppRows.push(
        <PPRow
          pp={pp}
          piece={idx === 0 ? piece : null}
          ppCount={pps.length}
          employees={props.employees}
          cPos={props.cPos}
          aEmp={props.aEmp}
          aPP={props.aPP}
          onTDC={props.onTDC}
          onXClick={props.onXClick}
          labels={labels}
          key={cuid()}
        />
      )
    })
  })

  const projectInfo = {name: props.project.name, id: props.project.id}
  return (
    <tbody>
      <tr>
        <th rowSpan={rowSpan}>{props.project.name}</th>
        <th> Piece </th>
        {labelCells}
        <th>Allotted</th>
        <th>Sum</th>
        {employees}
        <th>Complete</th>
        <th>Remove</th>
      </tr>
      {ppRows}
    </tbody>
  )
}

PlannerRowList.defaultProps = {
  project: {},
  pieces: [{}],
  pps: [{}],
  onXClick: id => console.log(id, "from the PlannerRowList component"),
  blockID: -1, //Used to find which input has been editted
  employees: [{}], //Array of names for colName
  onTDC: data => console.log(data, "from the PlannerRowList"),
  aPP: -1,
  aEmp: -1,
  cPos: -1,
  aOp: -1
}

export default PlannerRowList
