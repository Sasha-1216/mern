import React from 'react';
import PropTypes from 'prop-types';

export default class ProductAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      const product = {
        category: form.category.value,
        name: form.name.value,
        price: form.price.value,
        image: form.image.value,
      };
  
      const { createProduct } = this.props;
      createProduct(product);
  
      // clear the user input after submit
      form.category.value = '';
      form.name.value = '';
      form.price.value = '';
      form.image.value = '';
    }
  
    render() {

      return (
        <form name='productAdd' onSubmit={this.handleSubmit}>

          <fieldset>
            <label htmlFor='Category'>
              Category
              <select type='text' name='category' placeholder='category'>
                <option>Shirts</option>
                <option>Jeans</option>
                <option>Jackets</option>
                <option>Sweaters</option>
                <option>Accessories</option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor='Price'>
              Price Per Unit
              <input type='text' name='price' placeholder='$' />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor='productName'>
              Product Name
              <input type='text' name='name' placeholder='Product Name' />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor='image'>
              Image URL
              <input type='text' name='image' placeholder='Image URL' />
            </label>
          </fieldset>
          <button type='submit'>Add Product</button>
        </form>
      );
    }
  }

//   ProductAdd.propTypes = {
//     createIssue: PropTypes.func.isRequired,
//   };