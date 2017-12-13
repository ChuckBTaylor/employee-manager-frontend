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

  handleDemoClick = ev => {
    this.props.onLogIn({name: "Natalie", password: "dogs"})
  }

  render(){
    return(
      <div>
      <div className="login-header"> IWork </div>
      <div className="parallax">
        {this.props.logInFailed ? (<p>{this.props.errorMessage}</p>) : null}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Username: </label>
          <input className='login' type='text' value={this.state.name} onChange={this.handleNameChange} /><br />
          <label htmlFor="">Password: </label>
          <input type='password' className='login' value={this.state.password} onChange={this.handlePasswordChange} />
          <input type='submit' className='login' value='Log In' />
        </form>
        <div className="demo-holder">
        <button className="button button1"onClick={this.handleDemoClick} > Demo Button </button>
        </div>
        </div>
      </div>
    )
  }
}

LogInForm.defaultProps = {
  onLogIn: ev => console.log(ev, "from LogInForm")
}

export default LogInForm
