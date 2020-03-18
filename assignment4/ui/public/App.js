"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint "react/react-in-jsx-scope": "off" */

/* globals React ReactDOM */

/* eslint "react/jsx-no-undef": "off" */

/* eslint "react/no-multi-comp": "off" */

/* eslint "no-alert": "off" */
function ProductRow(_ref) {
  var product = _ref.product;
  return React.createElement("tr", null, React.createElement("td", null, product.id), React.createElement("td", null, product.name), React.createElement("td", null, "$", product.price.toFixed(2)), React.createElement("td", null, product.category), React.createElement("td", null, React.createElement("a", {
    href: product.image
  }, "View")));
}

var TableDescription = function TableDescription() {
  return React.createElement("p", null, "Showing all available products.");
};

var AddProductDescription = function AddProductDescription() {
  return React.createElement("p", null, "Add a new product to inventory.");
};

var AddProduct =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddProduct, _React$Component);

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
        name: form.name.value,
        price: form.price.value,
        image: form.image.value
      };
      var createProduct = this.props.createProduct;
      createProduct(product); // clear the user input after submit

      form.category.value = '';
      form.name.value = '';
      form.price.value = '';
      form.image.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("form", {
        name: "productAdd",
        onSubmit: this.handleSubmit
      }, React.createElement("fieldset", null, React.createElement("label", {
        htmlFor: "Category"
      }, "Category", React.createElement("select", {
        type: "text",
        name: "category",
        placeholder: "category"
      }, React.createElement("option", null, "Shirts"), React.createElement("option", null, "Jeans"), React.createElement("option", null, "Jackets"), React.createElement("option", null, "Sweaters"), React.createElement("option", null, "Accessories")))), React.createElement("fieldset", null, React.createElement("label", {
        htmlFor: "Price"
      }, "Price Per Unit", React.createElement("input", {
        type: "text",
        name: "price",
        placeholder: "$"
      }))), React.createElement("fieldset", null, React.createElement("label", {
        htmlFor: "productName"
      }, "Product Name", React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Product Name"
      }))), React.createElement("fieldset", null, React.createElement("label", {
        htmlFor: "image"
      }, "Image URL", React.createElement("input", {
        type: "text",
        name: "image",
        placeholder: "Image URL"
      }))), React.createElement("button", null, "Add Product"));
    }
  }]);

  return AddProduct;
}(React.Component);

function ProductTable(_ref2) {
  var productsArray = _ref2.productsArray;
  var productRows = productsArray.map(function (product) {
    return React.createElement(ProductRow, {
      key: product.id,
      product: product
    });
  });
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, " Index "), React.createElement("th", null, " Product Name "), React.createElement("th", null, " Price "), React.createElement("th", null, " Category "), React.createElement("th", null, " Image "))), React.createElement("tbody", null, productRows));
}

var ProductList =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ProductList, _React$Component2);

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
    value: function () {
      var _loadData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var query, response, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      productList {\n        id name price category image\n      }\n    }";
                _context.next = 3;
                return fetch(window.ENV.UI_API_ENDPOINT, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                result = _context.sent;
                this.setState({
                  productsArray: result.data.productList
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createProduct",
    value: function createProduct(product) {
      var newProduct = product;
      newProduct.price = parseFloat(product.price);
      this.mutateData(newProduct);
    }
  }, {
    key: "mutateData",
    value: function () {
      var _mutateData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(product) {
        var query;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation addProduct($product: ProductInput!) {\n      addProduct(product: $product) {\n          id name price category image\n        }\n      }";
                _context2.next = 3;
                return fetch(window.ENV.UI_API_ENDPOINT, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      product: product
                    }
                  })
                });

              case 3:
                this.loadData();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function mutateData(_x) {
        return _mutateData.apply(this, arguments);
      }

      return mutateData;
    }()
  }, {
    key: "render",
    value: function render() {
      var productsArray = this.state.productsArray;
      return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company Inventory"), React.createElement(TableDescription, null), React.createElement("hr", null), React.createElement(ProductTable, {
        productsArray: productsArray
      }), React.createElement(AddProductDescription, null), React.createElement("hr", null), React.createElement(AddProduct, {
        createProduct: this.createProduct
      }));
    }
  }]);

  return ProductList;
}(React.Component);

var element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));