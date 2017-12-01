import React, { Component } from 'react';
// import Spreadsheet from './Spreadsheet';
import WorkPlannerSpreadsheet from './WorkPlannerSpreadsheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createOperation, patchOperation, addToWeeklyPlanner } from '../actions/operation';
import SelectComponent from '../components/SelectComponent';
import { formatProjectForSpreadsheet, findByID } from '../helpers/generalHelpers';
import { selectPlanner } from '../actions/planner';

class OperationContainer extends Component{

  state = {
    filteredClient: "",
    filteredProject: "",
    monday: this.props
  }

  onClientFilterChange = value => {
    this.setState({filteredClient: +value, filteredProject: ""})
  }

  onProjectFilterChange = value => {
    this.setState({filteredProject: +value})
  }

  onPlannerChange = value => {
    this.setState({monday: value})
  }

  handleAddClick = () => {
    this.props.addToWeeklyPlanner(this.state.filteredProject)
    this.setState({filteredClient: "", filteredProject: ""})
  }

  onTableDataChange = ev => {
    const newOperation = (({id, name, complete, estimatedTime, pieceID, serviceID, projectID}) => ({id, name, complete, estimatedTime, pieceID, serviceID, projectID}))(ev)
    newOperation[ev.colName] = ev.newData
    this.props.patchOperation(newOperation)
  }

  render(){
    //This works with the select options.  Gives the correct project after a client is selected
    const filteredProjectOptions = this.state.filteredClient === "" ? [] : this.props.projects.filter(project => project.clientID === this.state.filteredClient)
    // /\ /\ /\ /\ /\ /\ //
    // \/ \/ \/ \/ \/ \/ //
    //Formats for the spreadsheet

    const formattedProjects = this.props.plannerProjects.map(projectID => {
      const pieceIDs = this.props.pieces.filter(piece => piece.projectID === projectID).map(piece => piece.id)
      const procedures = this.props.procedures.filter(procedure => pieceIDs.includes(procedure.pieceID))
      return formatProjectForSpreadsheet(findByID(this.props.projects, projectID), procedures)
    })
    console.log(this.props.planners, "planners");
    return(
      <div>
        <ul>
        <h1>Weekly Planner</h1>
        <h3>Choose Week</h3>
        <SelectComponent
          options={this.props.planners}
          value={this.state.monday}
          onSelectChange={this.props.onPlannerChange}
        />
        {this.props.plannerProjects.length < 1 ? null :
          <WorkPlannerSpreadsheet
            rowHeaders={formattedProjects}
            columnHeaders={this.props.employees}
            onTableDataChange={this.onTableDataChange}
            autoFormatColumnHeaders={true}
          />
        }
        <SelectComponent
          options={this.props.clients}
          defaultValue=""
          value={this.state.filteredClient}
          defaultText="Select a Client"
          onSelectChange={this.onClientFilterChange}
        />
        {this.state.filteredClient === "" ? null :
          <SelectComponent
            options={filteredProjectOptions}
            defaultValue=""
            value={this.state.filteredProject}
            defaultText="Select a Project"
            onSelectChange={this.onProjectFilterChange}
          />
        }
        {this.state.filteredProject === "" ? null :
          <button onClick={this.handleAddClick}>Add Project</button>
        }
        </ul>
      </div>
    )
  }
}

OperationContainer.defaultProps = {
  operations: [],
  planners: []
}

const mapStateToProps = state => {
  return {
    clients: state.clients.list,
    projects: state.projects.list,
    pieces: state.pieces.list,
    procedures: state.procedures.list,
    operations: state.operations.list,
    employees: state.employees.list,
    plannerProjects: state.planners.projectIDs,
    planners: state.planners.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createOperation, patchOperation, addToWeeklyPlanner, selectPlanner }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationContainer);
