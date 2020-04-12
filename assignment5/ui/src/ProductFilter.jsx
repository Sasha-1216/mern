/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';

export default class ProductFilter extends React.Component {
    render(){
        return (
            <div>
                <a href="/#/product"> All Products</a>
                {' | '}
                <a href="/#/proudcts?status=New"> New Products</a>
                {' | '}
                <a href="/#/products?status=Assigned">Assigned Products</a>
            </div>
        );
    }
}