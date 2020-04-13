import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const ProductRow = withRouter(({ product, deleteProduct, index }) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.status}</td>
      <td>{product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.category}</td>
      <td>
        <a href={product.image}>View</a>
      </td>
      <td>
        <Link to={`/edit/${product.id}`}>
          {' '}
          <button>Edit</button>{' '}
        </Link>
        <button
          onClick={() => {
            deleteProduct(index);
          }}
        >
          {' '}
          Delete{' '}
        </button>
      </td>
    </tr>
  );
});

export default function ProductTable({ productsArray, deleteProduct }) {
  const productRows = productsArray.map((product, index) => (
    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));

  return (
    <table className='bordered-table'>
      <thead>
        <tr>
          <th> Index </th>
          <th> Status </th>
          <th> Product Name </th>
          <th> Price </th>
          <th> Category </th>
          <th> Image </th>
          <th> Action </th>
        </tr>
      </thead>
      <tbody>{productRows}</tbody>
    </table>
  );
}
