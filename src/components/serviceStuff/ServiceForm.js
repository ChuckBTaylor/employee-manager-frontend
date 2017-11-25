import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createService, patchService } from '../../actions/service';

class ServiceForm extends Component{

  state = {
    name: this.props.isModal ? this.props.service.name : ""
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.props.isModal){
      this.props.patchService({...this.state, cuid: this.props.service.cuid, id: this.props.service.id})
      this.props.onModalClose()
    } else {
      this.props.createService(this.state)
      this.props.history.push('/services')
    }
  }

  render(){
    console.log(this.props, 'form props');
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
    name: ""
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createService, patchService }, dispatch)
}

export default connect(null, mapDispatchToProps)(ServiceForm);
