import React, { Component } from 'react';
import cuid from 'cuid';
import {findByID } from '../helpers/generalHelpers';
import ColumnHeaders from '../components/spreadsheetStuff/ColumnHeaders';
import PlannerRowList from '../components/plannerStuff/PlannerRowList';

class WorkPlannerSpreadsheet extends Component{

  state = {
    activeProcedure: -1,
    activeEmployee: -1,
    cursorPosition: -1
  }

  calculateRowHeadersLength = () => {
    if(this.props.rowHeaders.length > 0 && this.props.rowHeaders[0].procedures.length > 0){
      return Object.keys(this.props.rowHeaders[0].procedures[0]).length + 1
    }
    return 0
  }

  onTDC = data => {
    this.setState({activeProcedure: data.procedureID, activeEmployee: data.employeeID, cursorPosition: data.cursorPosition})
    if(data.colName === "allottedTime"){
      return this.props.onTableRowChange(data)
    }
    if(data.id !== -1){
      const operation = findByID(this.props.cellContents, data.id)
      return this.props.onTableDataChange({...operation, data: data.data, existed: true})
    }
    return this.props.onTableDataChange({data: data.data, existed: false, procedureID: data.procedureID, employeeID: data.employeeID})
  }

  render(){
    const employeeIDs = this.props.columnHeaders.map(employee => employee.id)
    const employeeCount = employeeIDs.length
    // employeeIDs.unshift('allottedTime')
    const sheetWidth = this.props.hasEmptyTopLeft ? employeeCount + 1 : employeeCount
    const rowList = this.props.rowHeaders.map((project, blockID) => {
      const filteredCellContents = this.props.cellContents.filter(cell => cell.projectID === project.id)
      return (
        <PlannerRowList key={cuid()}
          blockHeaders={project}
          blockID={blockID}
          sheetWidth={sheetWidth + this.calculateRowHeadersLength()}
          employeeCount={employeeCount}
          onXClick={this.props.onXClick}
          employeeIDs={employeeIDs}
          onTDC={this.onTDC}
          cellContents={filteredCellContents}
          aPro={this.state.activeProcedure}
          aEmp={this.state.activeEmployee}
          cPos={this.state.cursorPosition}
        />
      )
    })

    // console.log("WorkPlannerSpreadsheet rowHeaders", this.props.rowHeaders);
    return(
      <div>
        <table>
          <thead>
            <ColumnHeaders
              autoFormat={this.props.autoFormatColumnHeaders}
              columns={this.props.columnHeaders}
              hasEmptyTopLeft={this.props.hasEmptyTopLeft}
              rowHeadersLength={this.calculateRowHeadersLength()}
            />
          </thead>
          {rowList}
        </table>
      </div>
    )
  }
}

WorkPlannerSpreadsheet.defaultProps = {
  rowHeaders: [ //Array of project Objects
    {
      name: "",
      id: -1,
      complete: false,
      clientID: -1,
      subtype: 'office',
      procedures: [{
        name: "",
        compelte: false,
        estimatedTime: 0.00
      }, {}]
    }
  ],
  columnHeaders: [//Array of employee objects
    {
      name: "",
      id: -1
    },
    {
      name: "",
      id: -2
    }
  ],
  cellContents: [{}, {}], //incorporate operations in here
  onTableDataChange: data => console.log("function onTableDataChange(data){data}", data),
  onTableRowChange: data => console.log("function onTableRowChange(data){data}", data),
  autoFormatColumnHeaders: true,
  hasEmptyTopLeft: true,
  onXClick: id => console.log(id, "from the WorkPlannerSpreadsheet compoenent"),

}

export default WorkPlannerSpreadsheet;
