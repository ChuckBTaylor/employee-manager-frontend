import React, { Component } from 'react';
// import Spreadsheet from './Spreadsheet';
import WorkPlannerSpreadsheet from './WorkPlannerSpreadsheet';
import { connect } from 'react-redux';
import ConfirmModal from '../components/operationStuff/ConfirmModal';
import { bindActionCreators } from 'redux';
import { createOperation, patchOperation, fetchPlannerOperations } from '../actions/operation';
import SelectComponent from '../components/SelectComponent';
import { formatProjectForSpreadsheet, findByID } from '../helpers/generalHelpers';
import { selectPlanner, createPlanner, fetchPlannerProjects, addToWeeklyPlanner, removeFromWeeklyPlanner, patchPlanner } from '../actions/planner';
import NumberInputComponent from '../components/NumberInputComponent';
import { Grid } from 'semantic-ui-react';
import MyPieChart from '../components/chartStuff/MyPieChart';

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
      this.props.fetchPlannerOperations(value)
    }
  }

  handleNewPlannerClick = () => {
    this.props.createPlanner()
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

  onTableDataChange = data => {
    if(data.existed){
      this.props.patchOperation({...data, hours: data.data})
    } else {
      this.props.createOperation({...data, hours: data.data, plannerID: this.props.currentPlanner})
    }
  }

  onTableRowChange = data => {
    console.log('changing allotted Time', data);
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

  handleAllottedTimeChange = ev => {
    const planner = {...ev.object, allottedTime: ev.value}
    this.props.patchPlanner(planner)
  }

  totalTimeWorkedThisWeek = () => {
    return this.props.operations.reduce((agg, operation) => agg + operation.hours, 0)
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
    const currentPlanner = this.props.currentPlanner === -1 ? null : findByID(this.props.planners, this.props.currentPlanner)
    const allottedTime = currentPlanner ? currentPlanner.allottedTime : 0
    const totalTime = this.totalTimeWorkedThisWeek()
    const dataForPie = [{time: (totalTime <= allottedTime ? (allottedTime - totalTime) : 0), name: "Allotted Time Remaining"}, {time: (totalTime <= allottedTime ? totalTime : allottedTime), name: "Time Worked"}]
    const xtDataForPie = allottedTime - totalTime < 0 ? [{time: totalTime - allottedTime, name: "Time Over"}, {time: (allottedTime * 2) - totalTime, name:""}] : null

    return(
      <div>
      <h1>Weekly Planner</h1>
      <h3>Choose Week</h3>
      <SelectComponent
        options={this.props.planners}
        value={this.props.currentPlanner}
        onSelectChange={this.onPlannerChange}
        hasDefaultValue={false}
      />
          <h3>
            Allotted Time for the week: {currentPlanner ?
            <NumberInputComponent
              onValueChange={this.handleAllottedTimeChange}
              object={currentPlanner ? currentPlanner : null}
              objectKey={'allottedTime'}
            />
          : null}
          <br />
          Time worked this week: {totalTime ? totalTime : 0}
          </h3>
        <Grid celled='internally'>
          <Grid.Row>
            {this.props.plannerProjects.length < 1 ? null :
              <WorkPlannerSpreadsheet
                rowHeaders={formattedProjects}
                columnHeaders={this.props.employees}
                onTableDataChange={this.onTableDataChange}
                onTableRowChange={this.onTableRowChange}
                autoFormatColumnHeaders={false}
                onXClick={this.onXClick}
                cellContents={this.props.operations}
              />
            }
            <ConfirmModal extraMessage="Doing this will remove all records of the work done by the employees this week"
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
            modalOpen={this.state.modalOpen}
            onModalClose={this.onModalClose}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
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
            </Grid.Column>
            <Grid.Column width={5} >
              <button onClick={this.handleNewPlannerClick}>Create New Week</button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <MyPieChart data={dataForPie} xtData={xtDataForPie}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
    currentPlanner: state.planners.currentPlanner,
    pieces: state.pieces.list,
    procedures: state.procedures.list,
    operations: state.operations.list[state.planners.currentPlanner],
    employees: state.employees.list,
    plannerProjects: state.planners.projectIDs, //{plannerID: [projectID, projectID], plannerID: [...]}
    planners: state.planners.list

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createOperation, patchOperation, addToWeeklyPlanner, selectPlanner, fetchPlannerProjects, removeFromWeeklyPlanner, createPlanner, fetchPlannerOperations, patchPlanner }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationContainer);
