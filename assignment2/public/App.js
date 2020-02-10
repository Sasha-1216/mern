"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var initialProduct = [];

var TableDescription =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TableDescription, _React$Component);

  function TableDescription() {
    _classCallCheck(this, TableDescription);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableDescription).apply(this, arguments));
  }

  _createClass(TableDescription, [{
    key: "render",
    value: function render() {
      return React.createElement("p", null, "Showing all available products.");
    }
  }]);

  return TableDescription;
}(React.Component);

var AddProductDescription =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(AddProductDescription, _React$Component2);

  function AddProductDescription() {
    _classCallCheck(this, AddProductDescription);

    return _possibleConstructorReturn(this, _getPrototypeOf(AddProductDescription).apply(this, arguments));
  }

  _createClass(AddProductDescription, [{
    key: "render",
    value: function render() {
      return React.createElement("p", null, "Add a new product to inventory.");
    }
  }]);

  return AddProductDescription;
}(React.Component);

var AddProduct =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(AddProduct, _React$Component3);

  function AddProduct() {
    var _this;

    _classCallCheck(this, AddProduct);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddProduct).call(this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddProduct, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.productAdd;
      var product = {
        category: form.category.value,
        productName: form.productName.value,
        price: form.price.value,
        image: form.image.value
      };
      this.props.createProduct(product); // clear the user input after submit

      form.category.value = '';
      form.productName.value = '';
      form.price.value = '';
      form.image.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("form", {
        name: "productAdd",
        onSubmit: this.handleSubmit
      }, React.createElement("fieldset", null, React.createElement("label", null, "Category"), React.createElement("select", {
        type: "text",
        name: "category",
        placeholder: "category"
      }, React.createElement("option", null, "Shirts"), React.createElement("option", null, "Jeans"), React.createElement("option", null, "Jackets"), React.createElement("option", null, "Sweaters"), React.createElement("option", null, "Accessories"))), React.createElement("fieldset", null, React.createElement("label", null, "Price Per Unit"), React.createElement("input", {
        type: "text",
        name: "price",
        placeholder: "$"
      })), React.createElement("fieldset", null, React.createElement("label", null, "Product Name"), React.createElement("input", {
        type: "text",
        name: "productName",
        placeholder: "Product Name"
      })), React.createElement("fieldset", null, React.createElement("label", {
        htmlFor: "image"
      }, "Image URL"), React.createElement("input", {
        type: "text",
        name: "image",
        placeholder: "Image URL"
      })), React.createElement("button", null, "Add Product"));
    }
  }]);

  return AddProduct;
}(React.Component);

var ProductRow =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(ProductRow, _React$Component4);

  function ProductRow() {
    _classCallCheck(this, ProductRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductRow).apply(this, arguments));
  }

  _createClass(ProductRow, [{
    key: "render",
    value: function render() {
      var product = this.props.product;
      return React.createElement("tr", null, React.createElement("td", null, " ", product.id, " "), React.createElement("td", null, " ", product.productName, " "), React.createElement("td", null, " $", product.price.toString().replace(/[^0-9.]+/g, ''), " "), React.createElement("td", null, " ", product.category, " "), React.createElement("td", null, ' ', React.createElement("a", {
        href: product.image
      }, "View")), React.createElement("td", null, " ", product.created.toDateString(), " "));
    }
  }]);

  return ProductRow;
}(React.Component);

var ProductTable =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(ProductTable, _React$Component5);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductTable).apply(this, arguments));
  }

  _createClass(ProductTable, [{
    key: "render",
    value: function render() {
      var productRows = this.props.productsArray.map(function (product) {
        return React.createElement(ProductRow, {
          key: product.id,
          product: product
        });
      });
      return React.createElement("table", {
        className: "bordered-table"
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, " Index "), React.createElement("th", null, " Product Name "), React.createElement("th", null, " Price "), React.createElement("th", null, " Category "), React.createElement("th", null, " Image "), React.createElement("th", null, " Created "))), React.createElement("tbody", null, productRows));
    }
  }]);

  return ProductTable;
}(React.Component);

var ProductList =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(ProductList, _React$Component6);

  function ProductList() {
    var _this2;

    _classCallCheck(this, ProductList);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ProductList).call(this));
    _this2.state = {
      productsArray: []
    };
    _this2.createProduct = _this2.createProduct.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(ProductList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this3 = this;

      setTimeout(function () {
        _this3.setState({
          productsArray: initialProduct
        });
      }, 500);
    }
  }, {
    key: "createProduct",
    value: function createProduct(product) {
      product.id = this.state.productsArray.length + 1;
      product.created = new Date();
      var newProductsList = this.state.productsArray.slice();
      newProductsList.push(product);
      this.setState({
        productsArray: newProductsList
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company Inventory"), React.createElement(TableDescription, null), React.createElement("hr", null), React.createElement(ProductTable, {
        productsArray: this.state.productsArray
      }), React.createElement(AddProductDescription, null), React.createElement("hr", null), React.createElement(AddProduct, {
        createProduct: this.createProduct
      }));
    }
  }]);

  return ProductList;
}(React.Component);

var element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));