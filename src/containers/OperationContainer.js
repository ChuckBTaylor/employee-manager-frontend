import React, { Component } from 'react';
// import Spreadsheet from './Spreadsheet';
import WorkPlannerSpreadsheet from './WorkPlannerSpreadsheet';
import { connect } from 'react-redux';
import ConfirmModal from '../components/operationStuff/ConfirmModal';
import { bindActionCreators } from 'redux';
import { createOperation, patchOperation, fetchPlannerOperations } from '../actions/operation';
import SelectComponent from '../components/SelectComponent';
import { formatForSpreadsheet, findByID, calculateTimeWorked } from '../helpers/generalHelpers';
import { selectPlanner, createPlanner, fetchPPs, addToWeeklyPlanner, removeFromWeeklyPlanner, patchPlanner } from '../actions/planner';
import NumberInputComponent from '../components/NumberInputComponent';
import { Grid } from 'semantic-ui-react';
import PlannerTimeWorked from '../components/chartStuff/PlannerTimeWorked';
import TimeSpent from '../components/chartStuff/TimeSpent';


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
      this.props.fetchPPs(value)
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
    if(data.operation){
      this.props.patchOperation({...data.operation, hours: data.data})
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

    // This works with the select options.  Gives the correct project after a client is selected
    // const filteredProjectOptions = this.state.filteredClient === "" ? [] : this.props.projects.filter(project => project.clientID === this.state.filteredClient)
    // /\ /\ /\ /\ /\ /\ //
    // \/ \/ \/ \/ \/ \/ //
    const currentPPs = this.props.pps[this.props.currentPlanner] ? this.props.pps[this.props.currentPlanner] : []
    const formattedPPs = currentPPs.map(pp => {
      const procedure = findByID(this.props.procedures, pp.procedureID)
      return {
        ...pp,
        procedure_info: {
          complete: procedure.complete,
          process: procedure.name.split(' - ')[1],
          est: procedure.estimatedTime
        }
      }
    })
    const formattedForSpreadsheet = formattedPPs.length > 1 ? formatForSpreadsheet(formattedPPs, this.props.pieces, this.props.projects) : null
    //formattedForSpreadsheet = {pps: [{}], pieces: [{}], projects: [{}]}
    //   /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\    //
    //   \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/    //
    const currentPlanner = this.props.currentPlanner === -1 ? null : findByID(this.props.planners, this.props.currentPlanner)
    const allottedTime = currentPlanner ? currentPlanner.allottedTime : 0
    const totalTimeWorked = this.totalTimeWorkedThisWeek()
    const dataForTimeWorked = calculateTimeWorked(allottedTime, totalTimeWorked) //First Pie Graph

    return(
      <div>
      <h1>Weekly Planner</h1>
      <h3>Choose Week</h3>
      {/*}<SelectComponent
        options={this.props.planners}
        value={this.props.currentPlanner}
        onSelectChange={this.onPlannerChange}
        hasDefaultValue={false}
      />*/}
          <h3>
            Allotted Time for the week: {currentPlanner ?
            <NumberInputComponent
              onValueChange={this.handleAllottedTimeChange}
              object={currentPlanner ? currentPlanner : null}
              objectKey={'allottedTime'}
            />
          : null}
          <br />
          Time worked this week: {totalTimeWorked ? totalTimeWorked : 0}
          </h3>
        <Grid>
          <Grid.Row>
            {formattedPPs.length < 1 ? null :
              <WorkPlannerSpreadsheet
                ssData={formattedForSpreadsheet}
                employees={this.props.employees}
                onTableDataChange={this.onTableDataChange}
                autoFormatColumnHeaders={false}
                onXClick={this.onXClick}
              />
            }
            {/*}<ConfirmModal extraMessage="Doing this will remove all records of the work done by the employees this week"
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
            modalOpen={this.state.modalOpen}
            onModalClose={this.onModalClose}
            />*/}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5} >
              <button onClick={this.handleNewPlannerClick}>Create New Week</button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <PlannerTimeWorked data={dataForTimeWorked[0]} xtData={dataForTimeWorked.length > 1 ? dataForTimeWorked[1] : null}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <TimeSpent />
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
    employees: state.employees.list,
    pps: state.planners.pps, //{plannerID: [projectID, projectID], plannerID: [...]}
    planners: state.planners.list

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createOperation, patchOperation, addToWeeklyPlanner, selectPlanner, fetchPPs, removeFromWeeklyPlanner, createPlanner, fetchPlannerOperations, patchPlanner }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationContainer);
