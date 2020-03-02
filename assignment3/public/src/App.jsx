// const initialProduct = [];

function ProductRow(props) {
  const product = props.product;

  return (
    <tr>
      <td> {product.id} </td>
      <td> {product.name} </td>
      <td> ${product.price.toFixed(2)} </td>
      <td> {product.category} </td>
      <td>
        {' '}
        <a href={product.image}>View</a>
      </td>
      {/* <td> {product.created} </td> */}
    </tr>
  );
}

class TableDescription extends React.Component {
  render() {
    return <p>Showing all available products.</p>;
  }
}

class AddProductDescription extends React.Component {
  render() {
    return <p>Add a new product to inventory.</p>;
  }
}

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
      image: form.image.value
    };

    this.props.createProduct(product);

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
          <label>Category</label>

          <select type='text' name='category' placeholder='category'>
            <option>Shirts</option>
            <option>Jeans</option>
            <option>Jackets</option>
            <option>Sweaters</option>
            <option>Accessories</option>
          </select>
        </fieldset>
        <fieldset>
          <label>Price Per Unit</label>
          <input type='text' name='price' placeholder='$'></input>
        </fieldset>
        <fieldset>
          <label>Product Name</label>
          <input type='text' name='name' placeholder='Product Name'></input>
        </fieldset>
        <fieldset>
          <label htmlFor='image'>Image URL</label>
          <input type='text' name='image' placeholder='Image URL'></input>
        </fieldset>
        <button>Add Product</button>
      </form>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const productRows = this.props.productsArray.map(product => (
      <ProductRow key={product.id} product={product} />
    ));

    return (
      <table className='bordered-table'>
        <thead>
          <tr>
            <th> Index </th>
            <th> Product Name </th>
            <th> Price </th>
            <th> Category </th>
            <th> Image </th>
            {/* <th> Created </th> */}
          </tr>
        </thead>

        <tbody>{productRows}</tbody>
      </table>
    );
  }
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

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const result = await response.json();
    this.setState({ productsArray: result.data.productList });
  }

  createProduct(product) {
    this.mutateData(product);
  }

  async mutateData(product) {
    const query = `mutation addProduct($product: ProductInput!) {
      addProduct(product: $product) {
          id name price category image
        }
      }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } })
    });

    this.loadData();
  }

  render() {
    return (
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <TableDescription></TableDescription>
        <hr></hr>
        <ProductTable productsArray={this.state.productsArray}></ProductTable>
        <AddProductDescription></AddProductDescription>
        <hr></hr>
        <AddProduct createProduct={this.createProduct}></AddProduct>
      </React.Fragment>
    );
  }
}

const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));
