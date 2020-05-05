import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductList from './ProductList.jsx';
import ProductReport from './ProductReport.jsx';
import ProductEdit from './ProductEdit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from='/' to='/product' />
      <Route path='/product' component={ProductList} />
      <Route path='/report' component={ProductReport} />
      <Route path='/edit/:id' component={ProductEdit} />
      <Route component={NotFound} />
    </Switch>
  );
}
