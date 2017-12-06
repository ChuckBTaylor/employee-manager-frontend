import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createClient, patchClient } from '../../actions/client';

class ClientEdit extends Component{

  state = {
    name: this.props.isModal ? this.props.client.name : ""
  }

  // focusTextInput = () => {
  //   this.textInput.focus();
  // }


  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.props.isModal){
      this.props.patchClient({...this.state, id: this.props.client.id})
      this.props.onModalClose()
    } else {
      this.props.createClient(this.state)
      this.props.history.push('/clients')
    }
  }

  render(){
    return(
      <div className="sixteen wide column">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name} ref={(input) => {this.textInput = input; }}/>
          <input type='submit' />
        </form>
      </div>
    )
  }

  // componentDidMount = () => {
  //   this.focusTextInput()
  // }
}

ClientEdit.defaultProps = {
  isModal: false,
  client: {
    name: ""
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createClient, patchClient }, dispatch)
}

export default connect(null, mapDispatchToProps)(ClientEdit);
