import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CartItem from './cart-item';
import { GET_ALL_CURRENCY } from '../queries';
import { useQuery, useReactiveVar } from '@apollo/client';
import { cartItemsVar } from '../apollo';
import getSymbolFromCurrency from 'currency-symbol-map';

const erroneousCurrencies = ['LBP', 'AED', 'SAR', 'QAR'];

const Cart = ({
  hideCart,
  addToCart,
  removeFromCart,
  deleteCartItem,
  refetchProducts,
  setCurrency,
  currency,
}) => {
  const { data: currencyData } = useQuery(GET_ALL_CURRENCY);
  const cartItems = useReactiveVar(cartItemsVar);

  /**
   THE API THROWS AN ERROR WHEN THE SOME CURRENCIES ARE PASSED TO THE PRODUCT QUERY.
   FILTERING THEM OUT TO AVOID BREAKING OF CODE
   */
  const updatedCurrency = currencyData?.currency?.filter(
    (currency) => !erroneousCurrencies.includes(currency)
  );

  const totalAmount = cartItems.reduce((acc, current) => {
    const total = acc + current.totalAmount;
    return total;
  }, 0);

  const updateCurrency = async (e) => {
    const currencyCode = e.target.value;
    const { data } = await refetchProducts({ currency: currencyCode });

    // Update product price based on the new currency
    const updatedCartItems = data?.products.reduce((acc, current) => {
      const cartItem = cartItems.find((cartItem) => cartItem.id === current.id);
      if (cartItem) {
        cartItem.totalAmount = current.price * cartItem.quantity;
        cartItem.price = current.price;
        acc.push(cartItem);
      }
      return acc;
    }, []);

    cartItemsVar([...updatedCartItems]);
    setCurrency({
      code: currencyCode,
      symbol: getSymbolFromCurrency(currencyCode),
    });
  };

  return (
    <div className="cart__container">
      <div className="cart__body">
        <div className="cart__body--top">
          <FontAwesomeIcon icon={faArrowLeft} onClick={hideCart} />
          <p>YOUR CART</p>
        </div>
        <select onChange={updateCurrency} value={currency?.code}>
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
        {cartItems.length ? (
          <>
            <div className="cartitems">
              {!!cartItems.length && (
                <>
                  {cartItems.map((cartItem) => {
                    return (
                      <CartItem
                        cartItem={cartItem}
                        key={cartItem.id}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        deleteCartItem={deleteCartItem}
                        currency={currency}
                      />
                    );
                  })}
                </>
              )}
            </div>

            <hr />
            <div className="cart__body--buttom">
              <div className="cart__subtotal">
                <span>Subtotal</span>
                <p>
                  {currency.symbol}
                  <span>{totalAmount.toFixed(2)}</span>
                </p>
              </div>
              <button className="btn-white">
                MAKE THIS A SUBSCRIPTION (SAVE 20%)
              </button>
              <button>PROCEED TO CHECKOUT</button>
            </div>
          </>
        ) : (
          <p className="empty-cart"> There are no items in your cart</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
