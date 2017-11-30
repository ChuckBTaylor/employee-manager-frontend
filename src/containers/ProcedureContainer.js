import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ProcedureList from '../components/procedureStuff/ProcedureList';
// import ProcedureShow from '../components/procedureStuff/ProcedureShow';
// import ProcedureModal from '../components/procedureStuff/ProcedureModal';
// import ProcedureForm from '../components/procedureStuff/ProcedureForm';
import { fetchProcedures, patchProcedure } from '../actions/procedure';
import { fetchPieces } from '../actions/piece';
import { fetchServices } from '../actions/service';
// import { Route } from 'react-router';
import Spreadsheet from './Spreadsheet';


class ProcedureContainer extends Component{

  state = {
    modalOpen: false,
    filteredProject: -1
  }

  onTableDataChange = ev => {
    console.log(ev);
    const newProcedure = (({id, name, complete, estimatedTime, pieceID, serviceID, projectID}) => ({id, name, complete, estimatedTime, pieceID, serviceID, projectID}))(ev)
    console.log(newProcedure);
    newProcedure[ev.colName] = ev.newData
    this.props.patchProcedure(newProcedure)
  }

  handleFilterChange = ev => {
    this.setState({filteredProject: +ev.target.value})
  }

  render(){
    // columns = [
    //   {
    //     key: 'name',
    //     name: 'Process',
    //     width: 80
    //   },
    //   {
    //     key: 'estimatedTime',
    //     name: "Estimated Time",
    //     editable: true
    //   },
    //   {
    //     key: 'priority',
    //     name: "Priority",
    //     editable: true
    //   }
    // ]
      // const config = {
      //   rows: 5,
      //   columns: 4,
      //   hasHeadColumn: true,
      //   isHeadColumnString: true,
      //   hasHeadRow: true,
      //   isHeadRowString: true,
      //   canAddRow: true,
      //   canAddColumn: true,
      //   emptyValueSymbol: '-',
      //   hasLetterNumberHeads: false
      // }

    // const data = {
    //   rows: [
    //     ['0,0', '0,1', '0,2', '0,3'],
    //     ['1,0', '1,1', '1,2', '1,3'],
    //     ['2,0', '2,1', '2,2', '2,3'],
    //     ['3,0', '3,1', '3,2', '3,3']
    //   ]
    // }
    const projectOptions = this.props.projects.map((project, idx) => (<option value={project.id} key={idx*10}>{project.name}</option>))


    const filteredProcedures = this.state.filteredProject === -1 ? this.props.procedures : this.props.procedures.filter(procedure => procedure.projectID === this.state.filteredProject)

    const columnKeys = filteredProcedures.length > 0 ? Array.from(Object.keys(filteredProcedures[0])) : []

    const columnFilters = columnKeys.filter(column => !column.match(/ID$/i))
    const columns = columnFilters.map(column => ({key: column, name: column, isImmutable: false}))
    return(
      <div>
      <h2>All Active Projects' Processes</h2>
      <p>Filter By Project:</p>
      <select id='procedure-project-filter' value={this.state.filteredProject} onChange={this.handleFilterChange}>
        <option value={-1}>All</option>
        {projectOptions}
      </select>
      <br />
      <Spreadsheet
        rows={filteredProcedures}
        columnHeaders={columns}
        onTableDataChange={this.onTableDataChange}
        autoFormatColumnHeaders={true}
      />
      {/*
        <ReactDataGrid
          enableCellSelect={true}
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          onGridRowsUpdated={this.handleGridUpdate}
          />
        <SpreadsheetComponent spreadsheetId='1' config={config} initialData={data} dataChanged={this.props.handleDataChange} cellValueChanged={this.handleCellValueChange} onChange={this.handleDataChange} onCellValueChanged={this.handleCellValueChange} onDataChanged={this.handleDataChange}/>*/}
      </div>
    )
  }

  // componentDidMount = () => {
  //   if(this.props.didFetchPieces){
  //     if(this.props.didFetchServices){
  //       if(!this.props.didFetchProcedures){
  //         this.props.fetchProcedures()
  //       }
  //     } else {
  //       this.props.fetchServices()
  //         .then(() => this.props.fetchProcedures())
  //     }
  //   } else {
  //     if(this.props.didFetchServices){
  //       this.props.fetchPieces()
  //         .then(() => this.props.fetchProcedures())
  //     } else {
  //       Promise.all([this.props.fetchPieces(), this.props.fetchServices()])
  //         .then(() => this.props.fetchProcedures())
  //     }
  //   }
  // }
}

const mapStateToProps = state => {
  return {
    didFetchProcedures: state.procedures.didFetch,
    procedures: state.procedures.list,
    projects: state.projects.list,
    didFetchServices: state.services.didFetch,
    didFetchPieces: state.pieces.didFetch
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchProcedures, fetchServices, fetchPieces, patchProcedure }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcedureContainer);
