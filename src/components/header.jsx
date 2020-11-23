import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="header">
      <p className="logo">LUMIN</p>
      <a className="header-link" href="/products">
        Shop
      </a>
      <a className="header-link" href="/">
        Learn
      </a>

      <div className="header__account">
        <p className="header__account--text">Account</p>
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </div>
  );
};

export default Header;
