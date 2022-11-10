/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

const CartItem = ({
  cartItem,
  addToCart,
  removeFromCart,
  deleteCartItem,
  currency,
}) => {
  const handleAddToCart = () => {
    addToCart(cartItem);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(cartItem);
  };

  return (
    <div className="cartitem--wrapper">
      <div className="cartitem--wrapper-left">
        <p className="cartitem--title">{cartItem.title}</p>
        <div className="cartitem--price">
          <div className="cartitem--inputgroup">
            <FontAwesomeIcon icon={faMinus} onClick={handleRemoveFromCart} />
            <input type="number" value={cartItem.quantity} readOnly />
            <FontAwesomeIcon icon={faPlus} onClick={handleAddToCart} />
          </div>

          <p className="amount">
            <span>{currency.symbol}</span>
            <span> {cartItem.totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <div className="cartitem--wrapper-right">
        <FontAwesomeIcon
          icon={faWindowClose}
          onClick={() => deleteCartItem(cartItem)}
        />
        <img className="productimage" src={cartItem.image_url} alt="product" />
      </div>
    </div>
  );
};

export default CartItem;
