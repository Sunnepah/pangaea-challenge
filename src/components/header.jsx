/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { cartItemsVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';

const Header = ({ setDisplayCart }) => {
  const numberOfCartItems = useReactiveVar(cartItemsVar).reduce(
    (acc, cartItem) => {
      return acc + cartItem.quantity;
    },
    0
  );

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
        <FontAwesomeIcon
          icon={faShoppingCart}
          onClick={() => setDisplayCart((display) => !display)}
        />
        {!!numberOfCartItems && (
          <p className="cart-count">{numberOfCartItems}</p>
        )}
      </div>
    </div>
  );
};

export default Header;
