import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createService, patchService } from '../../actions/service';

class ServiceForm extends Component{

  state = {
    name: this.props.service.name || ""
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.props.isModal){
      this.props.patchService({...this.props.service, ...this.state})
      this.props.onModalClose()
    } else {
      this.props.createService(this.state)
      this.props.history.push('/services')
    }
  }

  render(){
    return(
      <div className="sixteen wide column">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

ServiceForm.defaultProps = {
  isModal: false,
  service: {
    name: "",
    id: -1
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createService, patchService }, dispatch)
}

export default connect(null, mapDispatchToProps)(ServiceForm);
