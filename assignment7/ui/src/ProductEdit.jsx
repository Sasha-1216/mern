import React from 'react';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
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

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = { product: {} };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState) => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    const query = `mutation productUpdate(
        $id: Int!
        $changes: ProductUpdateInputs!
        ){
            productUpdate(
             id: $id
             changes: $changes
        ){
            id name status category price image
        }
    }`;

    const { id, ...changes } = product;
    const data = await graphQLFetch(query, { id, changes });
    if (data) {
      this.setState({ product: data.productUpdate });
      alert('Updated issue successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const query = `query ($id: Int!) {
        product(id: $id) {
             id status name price category image
          }
    }`;

    const {
      match: {
        params: { id },
      },
    } = this.props;

    const data = await graphQLFetch(query, { id: parseInt(id) });
    this.setState({ product: data ? data.product : {} });
  }

  render() {
    const {
      product: { id },
    } = this.state;

    const {
      match: {
        params: { id: propsId },
      },
    } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const {
      product: { name, status, image, price, category },
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>{`Editing Product: ${id}`}</h3>

        <Row>
          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='Category'>Category: </ControlLabel>
              <FormControl
                componentClass='select'
                type='select'
                name='category'
                value={category}
                onChange={this.onChange}
              >
                {' '}
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
              <ControlLabel htmlFor='Price'>* Price Per Unit: </ControlLabel>
              <FormControl
                required
                componentClass={NumInput}
                value={price}
                onChange={this.onChange}
                name='price'
                placeholder='$'
                key={id}
              ></FormControl>
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='productName'>* Product Name: </ControlLabel>
              <FormControl
                required
                componentClass={TextInput}
                value={name}
                onChange={this.onChange}
                name='name'
                placeholder='Product Name'
                key={id}
              ></FormControl>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='image'> Image URL:</ControlLabel>
              <FormControl
                type='TextInput'
                value={image}
                onChange={this.onChange}
                name='image'
                placeholder='Image URL'
                key={id}
              ></FormControl>
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3} lg={3}>
            <FormGroup>
              <ControlLabel htmlFor='Status'>Status: </ControlLabel>
              <FormControl
                componentClass='select'
                value={status}
                onChange={this.onChange}
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
                  Update Product
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
