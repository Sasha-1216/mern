import React from 'react';

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.category}</td>
      <td>
        <a href={product.image}>View</a>
      </td>
      <td>
        <a href={`/#/edit/${product.id}`}>Edit</a>
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
