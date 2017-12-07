import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createClient, patchClient } from '../../actions/client';

class ClientForm extends Component{

  state = {
    name: this.props.client ? this.props.client.name : ""
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleClick = () => {
    if(this.state.name !== ""){
      if(this.props.isModal){
        this.props.patchClient({...this.props.client, name: this.state.name})
        this.props.onModalClose()
      } else {
        this.props.createClient(this.state)
        this.setState({name: ""})
      }
    }
  }

  isEnter = ev => {
    if(ev.which === 13){
      this.handleClick()
    }
  }

  handleDelete = ev => {
    this.props.onDestroyClient(this.props.client)
    this.props.onModalClose()
  }

  focusTextInput = () => {
    this.input.focus()
  }

  render(){
    return(
      <div className="sixteen wide column">
        <h3>Add Client:</h3>
        <label htmlFor="">Name: </label>

        <input type='text'
        placeholder='New Client'
        onKeyDown={this.isEnter}
        onChange={this.handleNameChange}
        value={this.state.name}
        ref={input => {this.input = input; }}
        onFocus={ev => {
          ev.target.selectionEnd = this.state.name.length
          ev.target.selectionStart = this.state.name.length
        }}/>

        <i onClick={this.handleClick} className={this.props.isModal ? 'save icon' : 'plus square outline icon'}/>
        {!this.props.isModal ? null :
          <div className='delete client'>
            <br />
            <i onClick={this.handleDelete} className='trash icon' />
          </div>
        }
      </div>
    )
  }

  componentDidMount = () => {
    if(this.props.isModal){
      this.focusTextInput()
    }
  }

}

ClientForm.defaultProps = {
  name: "",
  client: null,
  isModal: false
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createClient, patchClient }, dispatch)
}

export default connect(null, mapDispatchToProps)(ClientForm);
