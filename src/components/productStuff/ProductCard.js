import React from 'react';

const ProductCard = props => {

  const handleClick = () => {
    props.onSelectProduct(props.product)
  }

  return (
  <li onClick={handleClick}>
    {props.product.name}
  </li>
  )
}

export default ProductCard
