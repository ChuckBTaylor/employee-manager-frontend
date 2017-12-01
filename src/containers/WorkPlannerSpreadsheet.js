import React, { Component } from 'react';
import cuid from 'cuid';
import {findByID } from '../helpers/generalHelpers';
import ColumnHeaders from '../components/spreadsheetStuff/ColumnHeaders';
import PlannerRowList from '../components/plannerStuff/PlannerRowList';

class WorkPlannerSpreadsheet extends Component{

  state = {

  }

  calculateRowHeadersLength = () => {
    if(this.props.rowHeaders.length > 0 && this.props.rowHeaders[0].procedures.length > 0){
      return Object.keys(this.props.rowHeaders[0].procedures[0]).length + 1
    }
    return 0
  }

  render(){
    const employeeCount = this.props.columnHeaders.length
    const sheetWidth = this.props.hasEmptyTopLeft ? employeeCount + 1 : employeeCount
    const rowList = this.props.rowHeaders.map(project => (
      <PlannerRowList key={cuid()}
        blockHeaders={project}
        sheetWidth={sheetWidth + this.calculateRowHeadersLength()}
        employeeCount={employeeCount}
      />))

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
  cellContents: {}, //incorporate operations in here
  onTableDataChange: ev => console.log("function onTableDataChange(ev){ev}", ev),
  autoFormatColumnHeaders: true,
  hasEmptyTopLeft: true

}

export default WorkPlannerSpreadsheet;
