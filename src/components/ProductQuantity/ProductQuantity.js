import React from 'react';
import classes from './ProductQuantity.module.scss';

const ProductQuantity = ({ quantity, minusButtonClicked, plusButtonClicked }) => {
  return (
    <div className={classes.quantityButtonContainer}>
      <div className={classes.minusSign}>
        <button className={classes.adjustMinusButton} onClick={minusButtonClicked}>
          -
        </button>
      </div>
      <div className={classes.quantityContainer}>{quantity}</div>
      <div className={classes.plusSign}>
        <button className={classes.adjustPlusButton} onClick={plusButtonClicked}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;