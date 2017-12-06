import React, { Component } from 'react';
// import Spreadsheet from './Spreadsheet';
import WorkPlannerSpreadsheet from './WorkPlannerSpreadsheet';
import { connect } from 'react-redux';
import ConfirmModal from '../components/operationStuff/ConfirmModal';
import { bindActionCreators } from 'redux';
import { createOperation, patchOperation, fetchPlannerOperations } from '../actions/operation';
import SelectComponent from '../components/SelectComponent';
import { formatForSpreadsheet, findByID, calculateTimeWorked, allPPArray } from '../helpers/generalHelpers';
import { selectPlanner, createPlanner, fetchPPs, addToWeeklyPlanner, removeFromWeeklyPlanner, patchPlanner, patchPP } from '../actions/planner';
import NumberInputComponent from '../components/NumberInputComponent';
import { Grid } from 'semantic-ui-react';
import PlannerTimeWorked from '../components/chartStuff/PlannerTimeWorked';
import TimeSpent from '../components/chartStuff/TimeSpent';


class OperationContainer extends Component{

  state = {
    selectedProject: "",
    selectedPiece: "",
    selectedProcedure: "",
    modalOpen: false,
    projectOnBlock: -1
  }

  onProjectSelectChange = value => {
    this.setState({selectedProject: +value, selectedPiece: ""})
  }

  onPieceSelectChange = value => {
    this.setState({selectedPiece: +value, selectedProcedure: ""})
  }

  onProcedureSelectChange = value => {
    this.setState({selectedProcedure: +value})
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
    if(this.props.activePPs.map(pp => pp.procedureID).includes(this.state.selectedProcedure)){
      alert(`That process is already in the planner!`)
      this.setState({filteredProcedure: ""})
    } else {
      this.props.addToWeeklyPlanner(this.state.selectedProcedure, this.props.currentPlanner)
      this.setState({selectedProject: "", selectedPiece: "", selectedProcedure: ""})
    }
  }

  handleAddPiece = () => {
    const currentProcedureIDs = this.props.activePPs.map(pp => pp.procedureID)
    const allProcedureIDs = this.props.procedures.filter(procedure => procedure.pieceID === this.state.selectedPiece).map(procedure => procedure.id)
    const neededProcedures = allProcedureIDs.filter(id => !currentProcedureIDs.includes(id))
    console.log(allProcedureIDs, currentProcedureIDs);
    if(neededProcedures.length === 0){
      alert(`All of the procedures for that piece are in the planner`)
    } else {
      neededProcedures.forEach(procedureID => this.props.addToWeeklyPlanner(procedureID, this.props.currentPlanner))
    }
    this.setState({selectedPiece: ""})
  }

  onTableDataChange = data => {
    switch(data.type){
      case "OPERATION":
        if(data.operation){
          return this.props.patchOperation({...data.operation, hours: data.data})
        } else {
          return this.props.createOperation({...data, hours: data.data, plannerID: this.props.currentPlanner})
        }
      case "ALLOTTED":
        const uPP = findByID(this.props.pps[this.props.currentPlanner], data.ppID)
        return this.props.patchPP({...uPP, allottedTime: data.data})
      case "DESTROY":
        return this.props.removeFromWeeklyPlanner(data.ppID)
      default:
        console.log('unknown data.type', data);
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

  calculateTimeFromPPs = pps => {
    return pps.reduce((sum, pp) => {
      return sum + pp.operations.reduce((agg, op) => agg + op.hours, 0)
    }, 0)
  }


  render(){
    // This works with the select options.  Gives the correct project after a client is selected
    // const filteredProjectOptions = this.state.filteredClient === "" ? [] : this.props.projects.filter(project => project.clientID === this.state.filteredClient)
    // /\ /\ /\ /\ /\ /\ //
    // \/ \/ \/ \/ \/ \/ //
    const formattedPPs = this.props.activePPs.map(pp => {
      const procedure = findByID(this.props.procedures, pp.procedureID)
      if(!procedure){
        const t = this
        debugger
      }
      return {
        ...pp,
        procedure_info: {
          complete: procedure.complete,
          process: procedure.name.split(' - ')[1],
          est: procedure.estimatedTime
        }
      }
    })
    const formattedForSpreadsheet = formattedPPs.length > 0 ? formatForSpreadsheet(formattedPPs, this.props.pieces, this.props.projects) : undefined
    //formattedForSpreadsheet = {pps: [{}], pieces: [{}], projects: [{}]}
    //   /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\    //
    //   \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/    //
    const currentPlanner = this.props.currentPlanner === -1 ? null : findByID(this.props.planners, this.props.currentPlanner)
    const allottedTime = currentPlanner ? currentPlanner.allottedTime : 0
    const totalTimeWorked = this.calculateTimeFromPPs(this.props.activePPs)
    const dataForTimeWorked = calculateTimeWorked(allottedTime, totalTimeWorked) //First Pie Graph

    const dataForTimeSpentPiece = formattedForSpreadsheet ? formattedForSpreadsheet.pieces.map(piece => {
      const pps = formattedForSpreadsheet.pps.filter(pp => pp.pieceID === piece.id)
      return {
        time: this.calculateTimeFromPPs(pps),
        name: piece.name
      }
    }) : undefined
    const dataForTimeSpentProject = formattedForSpreadsheet ? formattedForSpreadsheet.projects.map(project => {
      const pps = formattedForSpreadsheet.pps.filter(pp => pp.projectID === project.id)
      return {
        time: this.calculateTimeFromPPs(pps),
        name: project.name
      }
    }) : undefined
    // /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\  //
    // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ //
    const filteredPieceOptions = this.state.selectedProject === "" ? [] :
      this.props.pieces.filter(piece => piece.projectID === this.state.selectedProject)
    const filteredProcedureOptions = this.state.selectedPiece === "" ? [] :
      this.props.procedures.filter(procedure => procedure.pieceID === this.state.selectedPiece)
      console.log(this.props.pps);
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
        <button onClick={this.handleNewPlannerClick}>Create New Week</button>
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
            {/*<ConfirmModal extraMessage="Doing this will remove all records of the work done by the employees this week"
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
            modalOpen={this.state.modalOpen}
            onModalClose={this.onModalClose}
            />*/}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <SelectComponent
                options={this.props.projects}
                value={this.state.selectedProject}
                onSelectChange={this.onProjectSelectChange}
                hasDefaultValue={true}
                defaultText="Choose a Project"
              />
            </Grid.Column>
            <Grid.Column width={2}>
              {this.state.selectedProject === "" ? null :
                <SelectComponent
                  options={filteredPieceOptions}
                  value={this.state.selectedPiece}
                  onSelectChange={this.onPieceSelectChange}
                  hasDefaultValue={true}
                  defaultText="Choose a Piece"
                />
              }
              {this.state.selectedPiece === "" ? null :
                <button onClick={this.handleAddPiece}>
                Add all piece processes
                </button>
              }
            </Grid.Column>
            <Grid.Column width={2}>
              {this.state.selectedPiece === "" ? null :
                <SelectComponent
                  options={filteredProcedureOptions}
                  value={this.state.selectedProcedure}
                  onSelectChange={this.onProcedureSelectChange}
                  hasDefaultValue={true}
                  defaultText="Choose a Process"
                />
              }
            </Grid.Column>
            <Grid.Column width={2}>
              {this.state.selectedProcedure === "" ? null :
                <button onClick={this.handleAddClick}>Add Process</button>
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <PlannerTimeWorked data={dataForTimeWorked[0]} xtData={dataForTimeWorked.length > 1 ? dataForTimeWorked[1] : null}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <TimeSpent data={dataForTimeSpentPiece}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <TimeSpent data={dataForTimeSpentProject}/>
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
    activePPs: state.planners.pps[state.planners.currentPlanner] ? state.planners.pps[state.planners.currentPlanner] : [],
    planners: state.planners.list

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createOperation, patchOperation, addToWeeklyPlanner, selectPlanner, fetchPPs, removeFromWeeklyPlanner, createPlanner, fetchPlannerOperations, patchPlanner, patchPP }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationContainer);
