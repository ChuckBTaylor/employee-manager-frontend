import React, { Component } from 'react';
import Spreadsheet from './Spreadsheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class OperationContainer extends Component{

  state = {

  }

  render(){
    const operations = this.props.operations.map(operation => (<li>{operation.hours}</li>))
    console.log(this.props);
    return(
      <div>
        <ul>
          {operations}
        </ul>
      </div>
    )
  }
}

OperationContainer.defaultProps = {
  operations: []
}

const mapStateToProps = state => {
  return {
    operations: state.operations.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationContainer);
