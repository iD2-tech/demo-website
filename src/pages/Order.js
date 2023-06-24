import React, { useEffect, useState } from 'react'
import classes from '../components/Order.module.scss';
import {loadStripe} from '@stripe/stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';
import Item from '../components/Item.js';

const Order = () => {

  const nav = useNavigate();

  const teriyaki = [
    {
      img: '../pages/images/davy.jpg',
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
    {
      img: '/images/davy.jpg',
      item: 'Soy Sauce',
      price: '$15.99'
    },
    {
      img: '/images/davy.jpg',
      item: 'Soy Sauce',
      price: '$15.99'
    },
    {
      img: '/images/davy.jpg',
      item: 'Soy Sauce',
      price: '$15.99'
    },
    {
      img: '/images/davy.jpg',
      item: 'Soy Sauce',
      price: '$15.99'
    },
    
    
  ];

  const stir = [
    {
      img: '../pages/images/davy.jpg',
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
          <h3 className={classes['menu-heading']}>Teriyaki</h3>
          <div className={classes['grid-container']}>
            <Item items ={teriyaki}/>
          </div>  
          <h3 className={classes['menu-heading']}>Stir Fry Vegetable</h3>
          <div className={classes['grid-container']}>
            <Item items ={stir}/>
          </div> 
          <h3 className={classes['menu-heading']}>Yakisoba</h3>
          <div className={classes['grid-container']}>
            <Item items ={stir}/>
          </div> 
          <h3 className={classes['menu-heading']}>Fried Rice</h3>
          <div className={classes['grid-container']}>
            <Item items ={stir}/>
          </div> 
          <h3 className={classes['menu-heading']}>Side Order</h3>
          <div className={classes['grid-container']}>
            <Item items ={stir}/>
          </div> 
          <h3 className={classes['menu-heading']}>Wok</h3>
          <div className={classes['grid-container']}>
            <Item items ={stir}/>
          </div> 
      </div>
    </div>
  )
}

export default Order
