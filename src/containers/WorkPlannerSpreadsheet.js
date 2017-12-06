import React, { Component } from 'react';
import cuid from 'cuid';
import {findByID } from '../helpers/generalHelpers';
import ColumnHeaders from '../components/spreadsheetStuff/ColumnHeaders';
import PlannerRowList from '../components/plannerStuff/PlannerRowList';

class WorkPlannerSpreadsheet extends Component{

  state = {
    activePP: -1,
    activeEmployee: -1,
    cursorPosition: -1
  }

  onTDC = data => {
    this.setState({activePP: data.ppID, activeEmployee: data.employeeID, cursorPosition: data.cursorPosition})
    const formatted = (({data, employeeID, operation, ppID}) => ({data, employeeID, operation, ppID}))(data)
    this.props.onTableDataChange(formatted)
  }

  render(){
    const rowList = this.props.ssData.projects.map((project, blockID) => {
      const filteredPieces = this.props.ssData.pieces.filter(piece => piece.projectID === project.id)
      const filteredPPs = this.props.ssData.pps.filter(pp => pp.projectID === project.id)
      return (
        <PlannerRowList key={cuid()}
          project={project}
          blockID={blockID}
          onXClick={this.props.onXClick}
          employees={this.props.employees}
          onTDC={this.onTDC}
          pieces={filteredPieces}
          pps={filteredPPs}
          aPP={this.state.activePP}
          aEmp={this.state.activeEmployee}
          cPos={this.state.cursorPosition}
        />
      )
    })

    // console.log("WorkPlannerSpreadsheet ssData", this.props.ssData);
    return(
      <div>
        <table>
          {rowList}
        </table>
      </div>
    )
  }
}

WorkPlannerSpreadsheet.defaultProps = {
  ssData: {
    pps: [], //array of pp objects with operations
    pieces: [], //array of piece objects
    projects: [] //array of project objects
  },
  employees: [//Array of employee objects
    {
      name: "",
      id: -1
    },
    {
      name: "",
      id: -2
    }
  ],
  onTableDataChange: data => console.log("function onTableDataChange(data){data}", data),
  onTableRowChange: data => console.log("function onTableRowChange(data){data}", data),
  autoFormatColumnHeaders: true,
  hasEmptyTopLeft: true,
  onXClick: id => console.log(id, "from the WorkPlannerSpreadsheet compoenent"),

}

export default WorkPlannerSpreadsheet;
