import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  Row,
  Col,
} from 'react-bootstrap';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

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
      status: form.status.value,
    };

    const { createProduct } = this.props;
    const newProduct = product;
    newProduct.price = parseFloat(product.price);
    createProduct(newProduct);

    // clear the user input after submit
    form.category.value = '';
    form.name.value = '';
    form.price.value = '';
    form.image.value = '';
    form.status.value = '';
  }

  render() {
    return (
      <Form name='productAdd' onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='Category'>Category: </ControlLabel>
              <FormControl
                componentClass='select'
                name='category'
                placeholder='category'
              >
                <option>Shirts</option>
                <option>Jeans</option>
                <option>Jackets</option>
                <option>Sweaters</option>
                <option>Accessories</option>
              </FormControl>
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='Price'> * Price Per Unit: </ControlLabel>
              <FormControl
                required
                componentClass={NumInput}
                name='price'
                placeholder='$'
              ></FormControl>
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='productName'>* Product Name: </ControlLabel>
              <FormControl
                required
                componentClass={TextInput}
                name='name'
                placeholder='Product Name'
              ></FormControl>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='image'> Image URL:</ControlLabel>
              <FormControl
                componentClass='input'
                name='image'
                placeholder='Image URL'
              ></FormControl>
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='Status'>Status: </ControlLabel>
              <FormControl
                componentClass='select'
                name='status'
                placeholder='status'
              >
                <option value='OnSale'>On Sale</option>
                <option value='New'> New </option>
                <option value='OutOfStock'> Out of Stock </option>
              </FormControl>
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel>&nbsp;</ControlLabel>
              <ButtonToolbar>
                <Button type='submit' bsStyle='primary'>
                  Add Product
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
