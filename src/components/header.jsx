import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { cartItemsVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';

const Header = () => {
  const numberOfCartItems = useReactiveVar(cartItemsVar).length;

  return (
    <div className="header">
      <p className="logo">LUMIN</p>
      <a className="header-link" href="/">
        Shop
      </a>
      <a className="header-link" href="/">
        Learn
      </a>

      <div className="header__account">
        <p className="header__account--text">Account</p>
        <FontAwesomeIcon icon={faShoppingCart} />
        {!!numberOfCartItems && (
          <p className="cart-count">{numberOfCartItems}</p>
        )}
      </div>
    </div>
  );
};

export default Header;
