import React from 'react';
import { useApolloClient } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CartItem from './cart-item';
import { GET_ALL_CURRENCY, GET_PRODUCTS } from '../queries';
import { useQuery, useReactiveVar } from '@apollo/client';
import { cartItemsVar } from '../apollo';
import getSymbolFromCurrency from 'currency-symbol-map';

const Cart = ({
  hideCart,
  addToCart,
  removeFromCart,
  deleteCartItem,
  refetchProducts,
  setCurrencySymbol,
  currencySymbol,
}) => {
  const { data: currencyData } = useQuery(GET_ALL_CURRENCY);
  const cartItems = useReactiveVar(cartItemsVar);
  const client = useApolloClient();

  /**
   * THE API THROWS AN ERROR WITH THE "AED" CURRENCY IS PASSED TO THE PRODUCT QUERY
   * FILTERING IT OUT TO AVOID BREAKING OF CODE
   */
  const updatedCurrency = currencyData?.currency?.filter(
    (currency) => currency !== 'AED'
  );

  const totalAmount = cartItems.reduce((acc, current) => {
    const total = acc + current.totalAmount;
    return total;
  }, 0);

  const updateCurrency = async (e) => {
    await refetchProducts({ currency: e.target.value });
    setCurrencySymbol(getSymbolFromCurrency(e.target.value));
    const data = client.readQuery({
      query: GET_PRODUCTS,
      variables: { currency: e.target.value },
    });

    // Update product price based on the new currency
    data?.products.forEach((product) => {
      const cartItem = cartItemsVar().find((item) => item.id === product.id);
      if (cartItem) {
        cartItem.totalAmount = product.price * cartItem.quantity;
        cartItem.price = product.price;
        cartItemsVar([...cartItemsVar()]);
      }
    });
  };

  return (
    <div className="cart__container">
      <div className="cart__body">
        <div className="cart__body--top">
          <FontAwesomeIcon icon={faArrowLeft} onClick={hideCart} />
          <p>YOUR CART</p>
        </div>
        <select onChange={updateCurrency}>
          {updatedCurrency?.length
            ? updatedCurrency?.map((currency) => {
                return (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                );
              })
            : ''}
        </select>
        <div className="cartitems">
          {cartItems.length ? (
            <>
              {cartItems.map((cartItem) => {
                return (
                  <CartItem
                    cartItem={cartItem}
                    key={cartItem.id}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    deleteCartItem={deleteCartItem}
                    currencySymbol={currencySymbol}
                  />
                );
              })}
            </>
          ) : (
            <p className="empty-cart"> No Items in your Cart</p>
          )}
        </div>

        <hr />
        <div className="cart__subtotal">
          <span>Subtotal</span>
          <p>
            {currencySymbol}
            <span>{totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
