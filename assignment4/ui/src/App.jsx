/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */

function ProductRow({ product }) {
  return (
    <tr>
      <td>
        {product.id}
      </td>
      <td>
        {product.name}
      </td>
      <td>
        $
        {product.price.toFixed(2)}
      </td>
      <td>
        {product.category}
      </td>
      <td>
        <a href={product.image}>
          View
        </a>
      </td>
    </tr>
  );
}

const TableDescription = () => (
  <p>Showing all available products.</p>
);

const AddProductDescription = () => (
  <p>Add a new product to inventory.</p>
);

class AddProduct extends React.Component {
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
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="Category">
            Category
            <select type="text" name="category" placeholder="category">
              <option>Shirts</option>
              <option>Jeans</option>
              <option>Jackets</option>
              <option>Sweaters</option>
              <option>Accessories</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="Price">
            Price Per Unit
            <input type="text" name="price" placeholder="$" />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="productName">
            Product Name
            <input type="text" name="name" placeholder="Product Name" />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="image">
            Image URL
            <input type="text" name="image" placeholder="Image URL" />
          </label>
        </fieldset>
        <button type="submit">Add Product</button>
      </form>
    );
  }
}

function ProductTable({ productsArray }) {
  const productRows = productsArray.map(product => (
    <ProductRow key={product.id} product={product} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th> Index </th>
          <th> Product Name </th>
          <th> Price </th>
          <th> Category </th>
          <th> Image </th>
        </tr>
      </thead>
      <tbody>{productRows}</tbody>
    </table>
  );
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { productsArray: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      productList {
        id name price category image
      }
    }`;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    this.setState({ productsArray: result.data.productList });
  }

  createProduct(product) {
    const newProduct = product;
    newProduct.price = parseFloat(product.price);
    this.mutateData(newProduct);
  }

  async mutateData(product) {
    const query = `mutation addProduct($product: ProductInput!) {
      addProduct(product: $product) {
          id name price category image
        }
      }`;

    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } }),
    });
    this.loadData();
  }

  render() {
    const { productsArray } = this.state;
    return (
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <TableDescription />
        <hr />
        <ProductTable productsArray={productsArray} />
        <AddProductDescription />
        <hr />
        <AddProduct createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}

const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));
