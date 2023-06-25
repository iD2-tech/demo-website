import React, { useEffect, useState, useRef } from 'react';
import classes from '../components/Order.module.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';
import Item from '../components/Item.js';

const Order = () => {
  const teriyakiRef = useRef(null);
  const stirFryRef = useRef(null);
  const yakisobaRef = useRef(null);
  const friedRiceRef = useRef(null);
  const sideOrderRef = useRef(null);
  const wokRef = useRef(null);
  const dailyRef = useRef(null);
  const breakfastRef = useRef(null);
  const sandwichesRef = useRef(null);
  const drinksRef = useRef(null);

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

  ];

  const stirFry = [
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

  const yakisoba = [
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

  const friedRice = [
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

  const sideOrder = [
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

  const wok = [
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

  const scrollToRef = (ref) => {
    const offset = 23;
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPosition = ref.current.offsetTop - headerHeight - offset;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  // Get all the menu headings
const menuHeadings = document.querySelectorAll('.menu-heading');

// Loop through each menu heading
menuHeadings.forEach(heading => {
  const width = heading.offsetWidth;
  const percentage = (width / window.innerWidth) * 100; 
  const leftPosition = 10 + (percentage / 2); 
  
  heading.style.setProperty('--left-position', `${leftPosition}%`);
});

  


  return (
    <div className={classes.container}>
        <div className={classes['left-container']}>
          <h3 className ={classes.menu}>MENU</h3>
          <ul className={classes['menu-categories']}>
            <li className={classes.refCat} onClick={() => scrollToRef(teriyakiRef)}>Teriyaki</li>
            <li className={classes.refCat} onClick={() => scrollToRef(stirFryRef)}>Stir Fry Vegetable</li>
            <li className={classes.refCat} onClick={() => scrollToRef(yakisobaRef)}>Yakisoba</li>
            <li className={classes.refCat} onClick={() => scrollToRef(friedRiceRef)}>Fried Rice</li>
            <li className={classes.refCat} onClick={() => scrollToRef(sideOrderRef)}>Side Order</li>
            <li className={classes.refCat} onClick={() => scrollToRef(wokRef)}>Wok</li>
            <li className={classes.refCat} onClick={() => scrollToRef(dailyRef)}>Daily Specials</li>
            <li className={classes.refCat} onClick={() => scrollToRef(breakfastRef)}>Breakfast</li>
            <li className={classes.refCat} onClick={() => scrollToRef(sandwichesRef)}>Sandwiches</li>          
            <li className={classes.refCat} onClick={() => scrollToRef(drinksRef)}>Drinks</li>        
          </ul>
      </div>
      <div className={classes['right-container']}>
        <h3 ref={teriyakiRef} className={classes['menu-heading']}>Teriyaki</h3>
        <div className={classes['grid-container']}>
          <Item items={teriyaki} />
        </div>
        <h3 ref={stirFryRef} className={classes['menu-heading']}>Stir Fry Vegetable</h3>
        <div className={classes['grid-container']}>
          <Item items={stirFry} />
        </div>
        <h3 ref={yakisobaRef} className={classes['menu-heading']}>Yakisoba</h3>
        <div className={classes['grid-container']}>
          <Item items={yakisoba} />
        </div>
        <h3 ref={friedRiceRef} className={classes['menu-heading']}>Fried Rice</h3>
        <div className={classes['grid-container']}>
          <Item items={friedRice} />
        </div>
        <h3 ref={sideOrderRef} className={classes['menu-heading']}>Side Order</h3>
        <div className={classes['grid-container']}>
          <Item items={sideOrder} />
        </div>
        <h3 ref={wokRef} className={classes['menu-heading']}>Wok</h3>
        <div className={classes['grid-container']}>
          <Item items={wok} />
        </div>
        <h3 ref={dailyRef} className={classes['menu-heading']}>Daily Specials</h3>
        <div className={classes['grid-container']}>
          <Item items={wok} />
        </div>
        <h3 ref={breakfastRef} className={classes['menu-heading']}>Breakfast</h3>
        <div className={classes['grid-container']}>
          <Item items={wok} />
        </div>
        <h3 ref = {sandwichesRef} className={classes['menu-heading']}>Sandwiches</h3>
        <div className={classes['grid-container']}>
          <Item items={wok} />
        </div>
        <h3 ref={drinksRef} className={classes['menu-heading']}>Drinks</h3>
        <div className={classes['grid-container']}>
          <Item items={wok} />
        </div>
      </div>
    </div>
  );
};

export default Order;

