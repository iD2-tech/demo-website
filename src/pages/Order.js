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
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [counter, setCounter] = useState(0);
  const nav = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5330/products');
      const data = await response.json();
      const array = data.products;
      setProducts(array);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchPrices = async () => {
    try {
      const response = await fetch('http://localhost:5330/prices');
      const data = await response.json();
      const array = data.prices.data;
      setPrices(array);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  useEffect(() => {
    window.dispatchEvent(new Event('storage')); // trigger update to header
    fetchProducts();
    fetchPrices();
  }, []);

  const scrollToRef = (ref) => {
    const offset = 23;
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPosition = ref.current.offsetTop - headerHeight - offset;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  const menuHeadings = document.querySelectorAll('.menu-heading');

  menuHeadings.forEach(heading => {
    const width = heading.offsetWidth;
    const percentage = (width / window.innerWidth) * 100; 
    const leftPosition = 10 + (percentage / 2); 
  
    heading.style.setProperty('--left-position', `${leftPosition}%`);
  });

  return (
    <div className={classes.container}>
      <div className={classes['left-container']}>
        <h3 className={classes.menu}>MENU</h3>
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
          {products.map((item, index) => (
            <Item item={item} index={index} key={index} prices={prices} />
          ))}
        </div>
        {/* Rest of the code */}
      </div>
    </div>
  );
};

export default Order;