import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductList from '../components/productStuff/ProductList';
import ProductShow from '../components/productStuff/ProductShow';
import ProductModal from '../components/productStuff/ProductModal';
import ProductForm from '../components/productStuff/ProductForm';
import { fetchProducts, selectProduct, destroyProduct } from '../actions/product';
import { Route } from 'react-router';

class ProductContainer extends Component{

  state = {
    modalOpen: false
  }

  handleNewProductClick = () => {
    this.props.history.push(`${this.props.match.path}/new`)
  }

  onEditClick = () => {
    this.setState({modalOpen: true})
  }

  onDeleteClick = () => {
    this.props.destroyProduct(this.props.selectedProduct)
  }

  onModalClose = () => {
    this.setState({modalOpen: false})
  }

  hasSelectedProduct = () => {
    return !!(Object.keys(this.props.selectedProduct).length > 0)
  }

  render(){
    return(
      <div>
        <Route exact path='/products' render={() => (<button onClick={this.handleNewProductClick} >New Product</button>) } /><br />
        <div className='ui grid'>
          <Route path='/products/new' render={props => (<ProductForm {...props} />) } />

          <ProductList onSelectProduct={this.props.selectProduct} products={this.props.products} />

          {this.hasSelectedProduct() > 0 ? (<Route exact path='/products' render={() => <ProductShow product={this.props.selectedProduct} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} />} />) : null}
        </div>

        <ProductModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} product={this.props.selectedProduct} />
      </div>
    )
  }

  componentDidMount = () => {
    this.props.didFetchProducts ? null : this.props.fetchProducts()
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.list,
    didFetchProducts: state.products.didFetch,
    selectedProduct: state.products.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchProducts, selectProduct, destroyProduct }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
