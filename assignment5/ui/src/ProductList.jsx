import React from 'react';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import URLSearchParams from 'url-search-params';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { productsArray: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('status')) vars.status = params.get('status');

    const query = `query productList($status: StatusType) {
        productList (status: $status) {
          id name price category image
        }
      }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ productsArray: data.productList });
    }
  }
    // const response = await fetch(window.ENV.UI_API_ENDPOINT, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query }),
    // });

    // const result = await response.json();
    // this.setState({ productsArray: result.data.productList });
  

  async createProduct(product) {
    const query = `mutation addProduct($product: ProductInput!) {
        addProduct(product: $product) {
            id name price category image
          }
        }`;

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
    }

    // const newProduct = product;
    // newProduct.price = parseFloat(product.price);
    // this.mutateData(newProduct);
  }

//   async mutateData(product) {}

  render() {
    const TableDescription = () => <p>Showing all available products.</p>;
    const AddProductDescription = () => <p>Add a new product to inventory.</p>;
    const { productsArray } = this.state;
    return (
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <TableDescription />
        <hr />
        <ProductTable productsArray={productsArray} />
        <AddProductDescription />
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}
