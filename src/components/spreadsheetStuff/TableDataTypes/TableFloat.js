import React, { Component } from 'react';

class TableFloat extends Component{

  state = {
    newData: this.props.newData
  }


  handleDataChange = ev => {
    const cPos = ev.target.selectionStart
    if(!ev.target.value.match(/\.$/)){
      this.props.onTDC({...this.props, newData: +ev.target.value, cursorPosition: cPos})
    } else {
      this.setState({newData: ev.target.value})
    }
  }

  focusTextInput = () => {
    this.textInput.focus();
  }

  render(){
    console.log(this.state);
    return(
      <td>
        <input
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
         value={this.state.newData}
         onChange={this.handleDataChange} />
      </td>
    )
  }

  componentDidMount = () => {
    if(this.props.rowNum === this.props.aRow && this.props.colNum === this.props.aCol){
      this.focusTextInput()
    }
  }

}

TableFloat.defaultProps = {
  newData: 0,
  id: 0,
  rowNum: 0,
  colNum: 0,
  aRow: 0,
  aCol:0,
  isSelected: false,
  cPos: 0
}

export default TableFloat;
