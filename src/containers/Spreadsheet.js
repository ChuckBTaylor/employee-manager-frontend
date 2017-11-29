import React, { Component } from 'react';
import ColumnHeaders from '../components/spreadsheetStuff/ColumnHeaders';
import RowList from '../components/spreadsheetStuff/RowList';
import { findByID } from '../helpers/generalHelpers'

class Spreadsheet extends Component{

  state = {
    activeRow: 0,
    activeColumn: 0,
    cursorPosition: 0
  }

  handleTDC = ev => {
    this.setState({activeRow: ev.rowNum, activeColumn: ev.colNum, cursorPosition: ev.cursorPosition})
    const rowObj = findByID(this.props.rows, ev.id)
    console.log(rowObj);
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
          cPos={this.state.cursorPosition}
        />
      </table>
    </div>
    )
  }
}

Spreadsheet.defaultProps = {
  rows: [{}, {}],
  columnHeaders: [{}, {}],
  autoFormatColumnHeaders: true,
  onTableDataChange: ev => (console.log(ev))
}

export default Spreadsheet;
