import React from 'react';
import classes from './CartProduct.module.scss';
import ProductQuantity from '../ProductQuantity/ProductQuantity';

const CartProduct = ({ product, index, minusButtonClicked, plusButtonClicked, removeFromCart }) => {
  return (
    <div key={product.ID} className={classes.product}>
      <div className={classes.productImage}>
        <img className={classes.image} src={product.images[0]} alt="background" />
      </div>
      <div className={classes.productMetaData}>
        <div className={classes.productNameContainer}>
          <p>{product.name}</p>
        </div>
        <div className={classes.productPriceContainer}>
          <b>${product.price}</b>
        </div>
        <div>
          {product.customizations.map((element, i) => (
            <p className={classes.customization}>+ ${element.price.toFixed(2)} &nbsp;{element.name}</p>
          ))}
        </div>
        <ProductQuantity
          quantity={product.quantity}
          minusButtonClicked={(e) => minusButtonClicked(e, index)}
          plusButtonClicked={(e) => plusButtonClicked(e, index)}
        />
      </div>
      <div className={classes.removeFromCartContainer}>
        <div className={classes.removeButton} onClick={(e) => removeFromCart(e, index)}>
            <span>X</span>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
