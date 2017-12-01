import React, { Component } from 'react';
import cuid from 'cuid';
import { findByID } from '../helpers/generalHelpers';

class SelectComponent extends Component{

  handleSelectChange = ev => {
    return this.props.onSelectChange(ev.target.value)
  }

  render(){
    const optionedOptions = this.props.options.map(option => (<option value={option.id} key={cuid()} >{option.name}</option>))
    return(
      <select value={this.props.value} onChange={this.handleSelectChange}>
        <option value="" disabled>{this.props.defaultText}</option>
        {optionedOptions}
      </select>
    )
  }
}

SelectComponent.defaultProps = {
  defaultValue: "",
  defaultText: "",
  options: []
}

export default SelectComponent;
