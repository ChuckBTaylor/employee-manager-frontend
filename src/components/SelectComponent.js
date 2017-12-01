import React from 'react';
import cuid from 'cuid';
import { findByID } from '../helpers/generalHelpers';

const SelectComponent = props => {

  const handleSelectChange = ev => {
    return props.onSelectChange(ev.target.value)
  }

  const optionedOptions = props.options.map(option => (<option value={option.id} key={cuid()} >{option.name}</option>))
  return(
    <select value={props.value} onChange={handleSelectChange}>
      {props.hasDefaultValue ? <option value="" disabled>{props.defaultText}</option> : null}
      {optionedOptions}
    </select>
  )
}

SelectComponent.defaultProps = {
  defaultValue: "",
  defaultText: "",
  options: [],
  hasDefaultValue: true
}

export default SelectComponent;
