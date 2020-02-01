import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import { render } from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
      </div>
    );
  }
}

export default App;
