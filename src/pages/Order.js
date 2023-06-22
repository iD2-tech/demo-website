import React, { useEffect, useState } from 'react'
import classes from '../components/Order.module.scss';
import {loadStripe} from '@stripe/stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';
import Item from '../components/Item.js';

const Order = () => {

  const nav = useNavigate();

  const teriyaki = [
    {
      img: '/images/davy.jpg',
      item: 'Teriyaki',
      price: '$13.99'
    },
    {
      img: '/images/davy.jpg',
      item: 'Spicy Teriyaki',
      price: '$13.99'
    },
    {
      img: '/images/davy.jpg',
      item: 'Soy Sauce',
      price: '$15.99'
    },
  ];


  return (
    // <div className={classes.container}>
    //   <div className={classes.buttonContainer}>
    //     <div onClick={() => displayMenu("Spring")} className={classes.item}>
    //       <img className={classes.image} src={require('./images/SpringPic.png')} alt="background"/>
    //       <p className={classes.header}>Appetizers</p>
    //     </div>
    //     <div onClick={() => displayMenu("Pho")} className={classes.item}>
    //       <img className={classes.image} src={require('./images/PhoPic.png')} alt="background"/>
    //       <p className={classes.header}>Pho</p>
    //     </div>
    //     <div onClick={() => displayMenu("Mi")} className={classes.item}>
    //       <img className={classes.image} src={require('./images/BahnPic.png')} alt="background"/>
    //       <p className={classes.header}>Banh Mi</p>
    //     </div>
    //   </div>
    // </div>

    <div className={classes.container}>
      <div className={classes['left-container']}>
        <h3>MENU</h3>
        <ul className={classes['menu-categories']}>
          <li>Teriyaki</li>
          <li>Stir Fry Vegetable</li>
          <li>Yakisoba</li>
          <li>Fried Rice</li>
          <li>Side Order</li>
          <li>Wok</li>
          <li>Daily Specials</li>
          <li>Breakfast</li>
          <li>Sandwiches</li>
          <li>Drinks</li>
        </ul>
      </div>
      <div className={classes['right-container']}>
        <div style ={{maxHeight: '100%'}}>
          <h3 className={classes['menu-heading']}>Teriyaki</h3>
          <div className={classes['grid-container']}>
            <Item items ={teriyaki}/>
          </div>  
      </div>
      </div>
    </div>
  )
}

export default Order
