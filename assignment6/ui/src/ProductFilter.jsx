import React from 'react';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  ButtonToolbar,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';

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
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>Status: </ControlLabel>
            <FormControl
              componentClass='select'
              value={status}
              onChange={this.onChangeStatus}
            >
              <option value=''>All</option>
              <option value='New'>New Product</option>
              <option value='OnSale'>On Sale</option>
              <option value='OutOfStock'>Out of Stock</option>
            </FormControl>
          </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
              <ControlLabel>&nbsp;</ControlLabel>
              <ButtonToolbar>

              <Button
                bsStyle="primary"
                type='button'
                onClick={this.applyFilter}
              >
                Apply
              </Button>{' '}
              <Button
                type='button'
                onClick={this.showOriginalFilter}
                disabled={!changed}
              >
                Reset
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Col>
  
      </Row>
    );
  }
}

export default withRouter(ProductFilter);
