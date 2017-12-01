import React, { Component } from 'react';
// import Spreadsheet from './Spreadsheet';
import WorkPlannerSpreadsheet from './WorkPlannerSpreadsheet';
import { connect } from 'react-redux';
import ConfirmModal from '../components/operationStuff/ConfirmModal';
import { bindActionCreators } from 'redux';
import { createOperation, patchOperation } from '../actions/operation';
import SelectComponent from '../components/SelectComponent';
import { formatProjectForSpreadsheet, findByID } from '../helpers/generalHelpers';
import { selectPlanner, fetchPlannerProjects, addToWeeklyPlanner, removeFromWeeklyPlanner } from '../actions/planner';

class OperationContainer extends Component{

  state = {
    filteredClient: "",
    filteredProject: "",
    modalOpen: false,
    projectOnBlock: -1
  }

  onClientFilterChange = value => {
    this.setState({filteredClient: +value, filteredProject: ""})
  }

  onProjectFilterChange = value => {
    this.setState({filteredProject: +value})
  }

  onPlannerChange = value => {
    if(findByID(this.props.planners, value).didFetchWeek){
      this.props.selectPlanner(value)
    } else {
      this.props.fetchPlannerProjects(value)
    }
  }

  handleAddClick = () => {
    if(this.props.plannerProjects[this.props.currentPlanner].includes(this.state.filteredProject)){
      alert(`That Project is already in the planner!`)
      this.setState({filteredProject: ""})
    } else {
      this.props.addToWeeklyPlanner(this.state.filteredProject, this.props.currentPlanner)
      this.setState({filteredClient: "", filteredProject: ""})
    }
  }

  onTableDataChange = ev => {
    const newOperation = (({id, name, complete, estimatedTime, pieceID, serviceID, projectID}) => ({id, name, complete, estimatedTime, pieceID, serviceID, projectID}))(ev)
    newOperation[ev.colName] = ev.newData
    this.props.patchOperation(newOperation)
  }

  onXClick = id => {
    this.setState({modalOpen: true, projectOnBlock: id})
  }

  onConfirm = () => {
    this.props.removeFromWeeklyPlanner(this.state.projectOnBlock, this.props.currentPlanner)
    this.setState({projectOnBlock: -1, modalOpen: false})
  }

  onModalClose = () => {
    this.setState({projectOnBlock: -1, modalOpen: false})
  }

  onCancel = () => {
    this.setState({projectOnBlock: -1, modalOpen: false})
  }

  render(){
    //This works with the select options.  Gives the correct project after a client is selected
    const filteredProjectOptions = this.state.filteredClient === "" ? [] : this.props.projects.filter(project => project.clientID === this.state.filteredClient)
    // /\ /\ /\ /\ /\ /\ //
    // \/ \/ \/ \/ \/ \/ //
    //Formats for the spreadsheet

    const formattedProjects = this.props.currentPlanner === -1 ? [] : this.props.plannerProjects[this.props.currentPlanner].map(projectID => {
      const pieceIDs = this.props.pieces.filter(piece => piece.projectID === projectID).map(piece => piece.id)
      const procedures = this.props.procedures.filter(procedure => pieceIDs.includes(procedure.pieceID))
      return formatProjectForSpreadsheet(findByID(this.props.projects, projectID), procedures)
    })

    return(
      <div>
        <ul>
        <h1>Weekly Planner</h1>
        <h3>Choose Week</h3>
        <SelectComponent
          options={this.props.planners}
          value={this.props.currentPlanner}
          onSelectChange={this.onPlannerChange}
          hasDefaultValue={false}
        />

        {this.props.plannerProjects.length < 1 ? null :
          <WorkPlannerSpreadsheet
            rowHeaders={formattedProjects}
            columnHeaders={this.props.employees}
            onTableDataChange={this.onTableDataChange}
            autoFormatColumnHeaders={true}
            onXClick={this.onXClick}
          />
        }
        <ConfirmModal extraMessage="Doing this will remove all records of the work done by the employees this week"
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        modalOpen={this.state.modalOpen}
        onModalClose={this.onModalClose}
        />
        <SelectComponent
          options={this.props.clients}
          defaultValue=""
          value={this.state.filteredClient}
          defaultText="Add a Client"
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
    plannerProjects: state.planners.projectIDs, //{plannerID: [projectID, projectID], plannerID: [...]}
    planners: state.planners.list,
    currentPlanner: state.planners.currentPlanner
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createOperation, patchOperation, addToWeeklyPlanner, selectPlanner, fetchPlannerProjects, removeFromWeeklyPlanner }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationContainer);
