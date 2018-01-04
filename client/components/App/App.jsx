import React from 'react';
import Logo from './logo.svg';
import './App.scss';

const App = () => (
  <div>
    <h1>REACT APP</h1>
    <p className="first">Первый</p>
    <p className="second">Второй</p>
    <img src={Logo} alt="Логотип компании" />
  </div>
);

export default App;
