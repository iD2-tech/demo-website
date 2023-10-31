import React from 'react';
import classes from './CheckoutButton.module.scss';
const CheckoutButton = ({ onClick }) => {
  return (
    <button className={classes.checkoutButton} onClick={onClick}>
      Checkout
    </button>
  );
};

export default CheckoutButton;