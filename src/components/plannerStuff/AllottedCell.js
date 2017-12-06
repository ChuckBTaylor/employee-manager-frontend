import React, { Component } from 'react';

class AllottedCell extends Component{

  state = {
    data: `${this.props.pp.allottedTime}`
  }

  handleDataChange = ev => {
    const cPos = ev.target.selectionStart
    if(!ev.target.value.match(/\.$/)){
      this.props.onTDC({...this.props, data: +ev.target.value, cursorPosition: cPos})
    } else {
      if(!ev.target.value.slice(0,-1).match(/\./)){
        this.setState({data: ev.target.value})
      }
    }
  }

  focusTextInput = () => {
    this.textInput.focus();
  }

  render(){
    const inputValue = this.state.data === "0" ? "" : this.state.data
    return(
      <td>
        <input
        size='5'
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
         value={inputValue}
         onChange={this.handleDataChange} />
      </td>
    )
  }

  componentDidMount = () => {
    if(this.props.isSelected){
      this.focusTextInput()
    }
  }
}

AllottedCell.defaultProps = {
  pp: {},
  cPos: 0,
  aPP: -1,
  isSelected: false,
  onTDC: ev => console.log(ev, "onTDC from AllottedCell"),
  type: "ALLOTTED"
}

export default AllottedCell;
