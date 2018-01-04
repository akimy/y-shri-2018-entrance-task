import React from 'react';
import Logo from './logo.svg';
import './Header.scss';
import Button from '../Button';

const Header = () => (
  <header className="header">
    <img className="header__logo" src={Logo} alt="Логотип компании" />
    <div className="header__button-container">
      <Button className="accept-button" label="Создать встречу" />
    </div>
  </header>
);

export default Header;
