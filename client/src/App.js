import React from 'react';
import './App.css';
import Login from "./components/login"
import Orders from './components/orders';
import Products from './components/products';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
  
      <h1 className="h1">RESTful API</h1>
      <div className="main">
        <Login/>
        <Orders/>
        <Products/>
        <Users/>
      </div>
    </div>
  );
}

export default App;
