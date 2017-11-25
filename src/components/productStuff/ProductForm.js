import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProduct, patchProduct } from '../../actions/product';

class ProductForm extends Component{

  state = {
    name: this.props.isModal ? this.props.product.name : ""
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.props.isModal){
      this.props.patchProduct({...this.state, cuid: this.props.cuid, id: this.props.id})
    } else {
      this.props.createProduct(this.state)
      this.props.history.push('/products')
    }
  }

  render(){
    console.log(this.props, 'form props');
    return(
      <div className="sixteen wide column">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

ProductForm.defaultProps = {
  isModal: false,
  product: {
    name: ""
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createProduct, patchProduct }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProductForm);
