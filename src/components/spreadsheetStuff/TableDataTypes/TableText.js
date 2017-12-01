import React, { Component } from 'react';

class TableText extends Component{

  state = {
    data: this.props.data
  }

  handleDataChange = ev => {
    const cursorPosition = ev.target.selectionStart
    this.setState({data: ev.target.value}, () => this.props.onTDC({...this.props, ...this.state, cursorPosition}))
  }

  focusTextInput = () => {
    this.textInput.focus()
  }

  render(){
    return(
      <td>
        <input
        type="text"
        value={this.state.data}
        onChange={this.handleDataChange}
        ref={input => this.textInput = input}
        onFocus={ev => {
          ev.target.selectionStart = ev.target.selectionEnd = this.props.cPos
        }}
        />
      </td>
    )
  }

  componentDidMount = () => {
    if(this.props.rowNum === this.props.aRow && this.props.colNum === this.props.aCol){
      this.focusTextInput()
    }
  }
}

TableText.defaultProps = {
  data: "",
  id: 0,
  rowNum: 0,
  colNum: 0,
  aRow: 0,
  aCol: 0
}

export default TableText;
