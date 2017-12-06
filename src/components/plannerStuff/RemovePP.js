import React, { Component } from 'react';

class RemovePP extends Component{

  state = {
    clicked: false
  }

  handleClick = () => {
    if(this.state.clicked){
      this.props.onTDC({...this.props})
    } else {
      this.setState({clicked: true})
      setTimeout(() => this.setState({clicked: false}), 1000)
    }
  }

  render(){
    return(
      <td onClick={this.handleClick}>
        <i className={this.state.clicked ? 'erase icon' : 'lock icon'} />
      </td>
    )
  }
}

RemovePP.defaultProps = {
  onTDC: ev => console.log(ev, 'from RemovePP'),
  type: "DESTROY",
  ppID: -1
}

export default RemovePP;
