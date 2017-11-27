import React from 'react';

const PieceShow = props => {
  return (
  <div>
    {props.piece.name}
  </div>
  )
}

PieceShow.defaultProps = {

}

export default PieceShow
