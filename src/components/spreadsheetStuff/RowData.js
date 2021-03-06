import React from 'react';
import TableImmutable from './TableDataTypes/TableImmutable';
import TableFloat from './TableDataTypes/TableFloat';
import TableText from './TableDataTypes/TableText';
import TableCheckbox from './TableDataTypes/TableCheckbox';

const RowData = props => {

  if(props.isImmutable){
    return (<TableImmutable aRow={props.aRow} aCol={props.aCol} rowNum={props.rowNum} colNum={props.colNum} colName={props.colName} id={props.id} newData={props.data} />)
  } else {
    switch(typeof(props.data)){
      case "boolean":
        return (<TableCheckbox cPos={props.cPos} aRow={props.aRow} aCol={props.aCol} rowNum={props.rowNum} colNum={props.colNum} colName={props.colName} id={props.id} data={props.data} onTDC={props.onTDC} />);
      case "number":
        return (<TableFloat isSelected={props.aRow === props.rowNum && props.aCol === props.colNum} cPos={props.cPos} rowNum={props.rowNum} colNum={props.colNum} colName={props.colName} id={props.id} data={props.data} onTDC={props.onTDC} />);
      case "string":
        return (<TableText isSelected={props.aRow === props.rowNum && props.aCol === props.colNum} rowNum={props.rowNum} colNum={props.colNum} cPos={props.cPos} colName={props.colName} id={props.id} data={props.data} onTDC={props.onTDC} />);
      default:
        return (<td> Invalid Format!{props.data} </td>);
    }
  }
}

RowData.defaultProps = {
  data: "",
  isImmutable: false,
  onTDC: ev => console.log(ev),
  rowNum: 0,
  colNum: 0,
  colName: "",
  aRow: 0,
  aCol: 0
}

export default RowData;
