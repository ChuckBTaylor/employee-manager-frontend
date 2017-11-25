import React from 'react';
import ProductCard from './ProductCard';

const ProductList = (props) => {

  const products = props.products.map(product => <ProductCard onSelectProduct={props.onSelectProduct} key={product.cuid} product={product} /> )

  return (
  <div className='four wide column'>
    <ul>
      {products}
    </ul>
  </div>
  )
}

ProductList.defaultProps = {
  products: []
}

export default ProductList
