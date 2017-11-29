import React, { Component } from 'react';

class TableFloat extends Component{


  handleDataChange = ev => {
    this.props.onTDC({...this.props, newData: +ev.target.value})
  }

  focusTextInput(){
    this.textInput.focus();
  }

  render(){
    return(
      <td>
        <input ref={input => {this.textInput = input; }} type="number" value={this.props.newData} onChange={this.handleDataChange} />
      </td>
    )
  }

  componentDidMount = () => {
  }

}

TableFloat.defaultProps = {
  newData: 0,
  id: 0,
  rowNum: 0,
  colNum: 0,
  isSelected: false
}

export default TableFloat;
