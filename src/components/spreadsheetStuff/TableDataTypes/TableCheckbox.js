import React, { Component } from 'react';

class TableCheckbox extends Component{


  handleDataChange = ev => {
    this.props.onTDC({...this.props, data: !this.props.data})
  }

  render(){
    return(
      <td onClick={this.handleDataChange}>
        <i className={this.props.data ? 'checkmark icon' : 'remove icon'} style={{color: this.props.data ? 'green' : 'red'}}/>
      </td>
    )
  }


}

TableCheckbox.defaultProps = {
  data: false,
  id: 0,
  rowNum: 0,
  colNum: 0
}

export default TableCheckbox;
