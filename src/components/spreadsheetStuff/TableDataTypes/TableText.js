import React, { Component } from 'react';

class TableText extends Component{

  state = {
    newData: this.props.newData
  }

  handleDataChange = ev => {
    this.setState({newData: ev.target.value}, () => this.props.onTDC({...this.props, ...this.state}))
  }

  render(){
    return(
      <td>
        <input type="text" value={this.state.newData} onChange={this.handleDataChange} />
      </td>
    )
  }
}

TableText.defaultProps = {
  newData: "",
  id: 0,
  rowNum: 0,
  colNum: 0
}

export default TableText;
