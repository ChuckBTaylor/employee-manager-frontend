import React, { Component } from 'react';

class LogInForm extends Component{

  state = {
    name: "",
    password: ""
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.onLogIn(this.state)
    this.setState({name: "", password: ""})
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handlePasswordChange = ev => {
    this.setState({password: ev.target.value})
  }

  render(){
    return(
      <div>
        {this.props.logInFailed ? (<p>{this.props.errorMessage}</p>) : null}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Username: </label>
          <input type='text' value={this.state.name} onChange={this.handleNameChange} /><br />
          <label htmlFor="">Password: </label>
          <input type='password' value={this.state.password} onChange={this.handlePasswordChange} />
          <input type='submit' value='submit' />
        </form>
      </div>
    )
  }
}

LogInForm.defaultProps = {
  onLogIn: ev => console.log(ev, "from LogInForm")
}

export default LogInForm
