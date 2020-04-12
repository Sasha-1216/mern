import React from 'react';
import { Link } from 'react-router-dom';

function ProductRow({ product }) {
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
        <Link to={`/edit/${product.id}`}>Edit</Link>
      </td>
    </tr>
  );
}

export default function ProductTable({ productsArray }) {
  const productRows = productsArray.map((product) => (
    <ProductRow key={product.id} product={product} />
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
