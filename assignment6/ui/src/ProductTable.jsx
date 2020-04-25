import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
  Table,
} from 'react-bootstrap';

const ProductRow = withRouter(({ product, deleteProduct, index }) => {
  const selectLocation = { pathname: `/product/${product.id}` };
  const editTooltip = (
    <Tooltip id='close-tooltip' placement='top'>
      Edit Product
    </Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id='delete-tooltip' placement='top'>
      Delete Product
    </Tooltip>
  );

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
        <LinkContainer to={`/edit/${product.id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
            <Button bsSize='xsmall'>
              <Glyphicon className='edit' glyph='edit' />
            </Button>
          </OverlayTrigger>
        </LinkContainer>

        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize='xsmall' onClick={() => deleteProduct(index)}>
            <Glyphicon className='delete' glyph='trash' />
          </Button>
        </OverlayTrigger>
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
    <Table bordered condensed hover responsive>
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
    </Table>
  );
}
