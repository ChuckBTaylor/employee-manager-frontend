import React from 'react';

const PieceShow = props => {
  console.log(props);
  return (
  <div>
    <h2>{props.project.name}</h2>
    {props.piece.name}
  </div>
  )
}

PieceShow.defaultProps = {

}

export default PieceShow
