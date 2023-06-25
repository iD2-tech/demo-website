import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../components/Item.module.scss';
import Image from '../pages/images/davy.jpg';

function Item(props) {
  const { items } = props;
  const nav = useNavigate();
  const [itemValues, setItemValues] = useState(new Array(items.length).fill(0));

  const decreaseQuantity = (index) => {
    if (itemValues[index] > 0) {
      const newValues = [...itemValues];
      newValues[index] -= 1;
      setItemValues(newValues);
    }
  };

  const increaseQuantity = (index) => {
    const newValues = [...itemValues];
    newValues[index] += 1;
    setItemValues(newValues);
  };

  return (
    <div className={classes['item-container']}>
      {items.map((item, index) => (
        <div className={classes['grid-item']} key={index}>
          <div className={classes['image-wrapper']}>
            <img className={classes.image} src={Image} alt="background" />
            {itemValues[index] > 0 && (
              <div className={classes['red-box']}>
              <span className={classes['box-text']}>
                <span className ={classes.boxText}>{itemValues[index]}</span>
                <br />
                <span className = {classes.boxText}>in your cart</span>
              </span>
            </div>
            )}
          </div>
          <div>
            <p className={classes.imageText}>{item.item}</p>
            <div className={classes['price-button-container']}>
              <p className={classes.price}>{item.price}</p>
              <div className={classes['button-container']}>
                <button className={classes.button} onClick={() => decreaseQuantity(index)}>
                  -
                </button>
                <button className={classes.button} onClick={() => increaseQuantity(index)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;
