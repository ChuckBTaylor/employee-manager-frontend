import React, { Component } from 'react';

class TableCheckbox extends Component{


  handleDataChange = ev => {
    this.props.onTDC({...this.props, newData: !this.props.newData})
  }

  render(){
    return(
      <td onClick={this.handleDataChange}>
        <i className={this.props.newData ? 'checkmark icon' : 'remove icon'} style={{color: this.props.newData ? 'green' : 'red'}}/>
      </td>
    )
  }


}

TableCheckbox.defaultProps = {
  newData: false,
  id: 0,
  rowNum: 0,
  colNum: 0
}

export default TableCheckbox;
