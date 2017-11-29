import React, { Component } from 'react';
import ColumnHeaders from '../components/spreadsheetStuff/ColumnHeaders';
import RowList from '../components/spreadsheetStuff/RowList';
import { findByID } from '../helpers/generalHelpers'

class Spreadsheet extends Component{

  state = {
    activeRow: 0,
    activeColumn: 0
  }

  handleTDC = ev => {
    console.log(ev);
    const rowObj = findByID(this.props.rows, ev.id)
    this.props.onTableDataChange({...rowObj, ...ev})
  }

  // const objectOfRows = () => {
  //   return objectArrayToObject(props.rows, 'id')
  // }
  render(){
    return(
    <div>
      <table>
        <thead>
          <ColumnHeaders autoFormat={this.props.autoFormatColumnHeaders} columns={this.props.columnHeaders}/>
        </thead>
        <tfoot>
        </tfoot>
        <RowList
          aRow={this.state.activeRow}
          aCol={this.state.activeColumn}
          rows={this.props.rows}
          columns={this.props.columnHeaders}
          onTDC={this.handleTDC}
        />
      </table>
    </div>
    )
  }

  componentWillUpdate = () => {
    console.log("Oh please don't see me");
  }
}

Spreadsheet.defaultProps = {
  rows: [{}, {}],
  columnHeaders: [{}, {}],
  autoFormatColumnHeaders: true,
  onTableDataChange: ev => (console.log(ev))
}

export default Spreadsheet;
