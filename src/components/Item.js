import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../components/Item.module.scss';
import Image from '../pages/images/davy.jpg';

function Item(props) {
  const { items } = props;
  const nav = useNavigate();
  const [selectedValue, setSelectedValue] = useState(0);

  const decreaseQuantity = () => {
    if (selectedValue > 0) {
      setSelectedValue((prevValue) => prevValue - 1);
    }
  };

  const increaseQuantity = () => {
    setSelectedValue((prevValue) => prevValue + 1);
  };

  return (
    <div className={classes['item-container']}>
      {items.map((item, index) => (
        <div className={classes['grid-item']} key={index}>
          <img className={classes.image} src={Image} alt="background" />
          <div className={`${classes['red-box']} ${selectedValue > 0 ? classes.visible : ''}`}>
            <span className={classes['red-box-text']}>
              {selectedValue}
              <br />
              in your cart
            </span>
          </div>
          <div className={classes['image-text']}>
            <p>{item.item}</p>
            <div className={classes['price-button-container']}>
              <p className={classes.price}>{item.price}</p>
              <div className={classes['button-container']}>
                <button className={classes.button} onClick={decreaseQuantity}>-</button>
                <button className={classes.button} onClick={increaseQuantity}>+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;
