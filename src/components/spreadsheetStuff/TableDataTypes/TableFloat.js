import React, { Component } from 'react';

class TableFloat extends Component{

  state = {
    data: this.props.data
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
    const inputValue = +this.state.data === 0 ? "" : this.state.data
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

TableFloat.defaultProps = {
  data: 0,
  id: -1,
  rowNum: 0,
  colNum: 0,
  isSelected: false,
  cPos: 0,
  onTDC: ev => console.log(ev.target.value)
}

export default TableFloat;
