import React from 'react';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';

class ProductFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      changed: false,
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }



  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  showOriginalFilter() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { status } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/product',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {
    const { status, changed } = this.state;
    return (
      <div className='product-filter'>
        Status:{' '}
        <select value={status} onChange={this.onChangeStatus}>
          <option value=''>All</option>
          <option value='New'>New Product</option>
          <option value='OnSale'>On Sale</option>
          <option value='OutOfStock'>Out of Stock</option>
        </select>{' '}
        <button type='button' onClick={this.applyFilter}>
          Apply
        </button>{' '}
        <button
          type='button'
          onClick={this.showOriginalFilter}
          disabled={!changed}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default withRouter(ProductFilter);
