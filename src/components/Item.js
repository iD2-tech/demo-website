import Image from '../pages/images/davy.jpg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../components/Item.module.scss';

function Item({ item, index }) {
  const nav = useNavigate();
  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={classes['grid-item']} key={index}>
      <div className={classes['image-wrapper']}>
        <img className={classes.image} src={Image} alt="background" />
        {quantity > 0 && (
          <div className={classes['red-box']}>
            <span className={classes['box-text']}>
              <span className={classes.boxText}>{quantity}</span>
              <br />
              <span className={classes.boxText}>in your cart</span>
            </span>
          </div>
        )}
      </div>
      <div>
        <p className={classes.imageText}>{item.item}</p>
        <div className={classes['price-button-container']}>
          <p className={classes.price}>{item.price}</p>
          <div className={classes['button-container']}>
            <button className={classes.button} onClick={decreaseQuantity}>
              -
            </button>
            <button className={classes.button} onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
