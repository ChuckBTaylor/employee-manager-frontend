import React, { Component } from 'react';

class NumberInputComponent extends Component{

  state = {
    value: this.props.object ? `${this.props.object[this.props.objectKey]}` : ""
  }

  handleChange = ev => {
    const cPos = ev.target.selectionStart
    if(!ev.target.value.match(/\.$/)){
      this.props.onValueChange({...this.props, value: +ev.target.value, cursorPosition: cPos})
      this.setState({value: ev.target.value})
    } else {
      if(!ev.target.value.slice(0,-1).match(/\./)){
        this.setState({value: ev.target.value})
      }
    }
  }

  lastCharacterDecimal = () => {
    return !!this.state.value.match(/\.$/)
  }

  render(){
    console.log('NIC state', this.state);
    console.log(this.lastCharacterDecimal());
    return(
      <input
      size={this.props.size}
      onKeyPress={ev => {
        if((ev.which >= 48 && ev.which <= 57) || ev.which === 46){
          return
        } else {
          ev.preventDefault()
        }
      }}
      ref={input => {this.textInput = input; }}
      onFocus={ev => {
        ev.target.selectionStart = ev.target.selectionEnd = this.props.cPos
      }}
       type="text"
       value={this.state.value}
       onChange={this.handleChange} />
    )
  }
}

NumberInputComponent.defaultProps = {
  object: {},
  objectKey: "",
  size: '5',
  value: "",
  onValueChange: ev => console.log(ev, 'from NIC')
}

export default NumberInputComponent;
