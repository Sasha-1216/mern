import React from 'react';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import ProductFilter from './ProductFilter.jsx';
import URLSearchParams from 'url-search-params';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { productsArray: [], counts: 0 };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
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

    const productListQuery = `query productList($status: StatusType) {
        productList (status: $status) {
          id status name price category image
        }
      }`;

    const productListData = await graphQLFetch(productListQuery, vars);
    if (productListData) {
      this.setState({ productsArray: productListData.productList });
    }

    const countQuery = `query { counts }`;
    const countData = await graphQLFetch(countQuery);
    if (countData) {
      this.setState({ counts: countData.counts });
    }
  }

  async createProduct(product) {
    const query = `mutation addProduct($product: ProductInput!) {
        addProduct(product: $product) {
            id status name price category image
          }
        }`;

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
    }
  }

  async deleteProduct(index) {
    const query = `mutation deleteProduct($id: Int!) {
      productDelete(id: $id)
    }`;
    const { productsArray } = this.state;

    const { id } = productsArray[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.deleteProduct) {
      this.setState((prevState) => {
        const newList = [...prevState.product];
        if (pathname === `/product/${id}`) {
          history.push({ pathname: '/product', search });
        }
        newList.splice(index, 1);
        return { productsArray: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { counts } = this.state;
    const TableDescription = () => <p> Showing {counts} available products.</p>;
    const AddProductDescription = () => <p>Add a new product to inventory.</p>;
    const { productsArray } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ProductFilter />
          </Panel.Body>
        </Panel>
        <TableDescription />

        <hr />
        <ProductTable
          productsArray={productsArray}
          deleteProduct={this.deleteProduct}
        />
        <AddProductDescription />
        <hr />
        <ProductAdd createProduct={this.createProduct} />
        <hr />
        <Route path={`${match.path}/:id`} />
      </React.Fragment>
    );
  }
}
