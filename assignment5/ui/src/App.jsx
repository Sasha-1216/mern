/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */

// import 'babel-polyfill';
// import 'whatwg-fetch';
import 'whatwg-fetch';

import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';




// const element = <ProductList />;
const element = (
  <Router>
    <Page />
  </Router>
);
ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}