import React from 'react';
import { Button } from 'semantic-ui-react';

const ProductShow = props => {

  const handleEditClick = () => {
    props.onEditClick()
  }

  const handleDeleteClick = () => {
    props.onDeleteClick()
  }
  
  return (
  <div className='six wide column'>
    {props.product.name}<br />
    <Button onClick={handleEditClick}>Edit {props.name}</Button>
    <Button onClick={handleDeleteClick}>Delete {props.name}</Button>
  </div>
  )
}

ProductShow.defaultProps = {

}

export default ProductShow
