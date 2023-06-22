import React, { useEffect, useState } from 'react'
import classes from '../components/Order.module.scss';
import {loadStripe} from '@stripe/stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';

const Order = () => {

  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.dispatchEvent(new Event('storage')) // trigger update to header
    getProducts();
    getPrices();
      if (products.length === 0) {
        if (counter < 1) {
          setCounter(counter + 1);
        }
      }
    console.log(products);

  }, [counter])


  // get all products from stripe
  const getProducts = async() => {
    fetch('http://localhost:3000/products')
      .then(r => r.json())
      .then(data => {
        var array = data.products;
        setProducts(array);
      });
     
  }

  // get all prices from stripe
  const getPrices = async() => {

    fetch('http://localhost:3000/prices', {
    }).then(r => r.json())
      .then(data => {
        var array = data.price;
        setPrices(array);
      })
  }
    
  // combines the products with its corresponding prices
  // navigates to the displayMenu based on what button the user pressed (appateizer, pho, banh mi)
  const displayMenu = (props) => {
    combinePrices();
    var array =[];
    for (let i = 0; i < products.length; i++) {
      if (products[i].name.includes(props)) {
        array.push(products[i]);
      }
    }
    console.log(array);
    var category;
    if (props.includes("Spring")) {
      category = "Appetizers"
    } else if (props.includes("Pho")) {
      category = "Pho"
    } else {
      category = "Banh Mi"
    }

    // the product list sent is just the products that fall under the category
    // all products is all products to keep track of quantity
    nav("/displayMenu", {
      state: {
        productList: array,
        category: category,
        allProducts: products
      }
    })
  }

  // combines products to prices
  const combinePrices = () => {
    for (let i = 0; i < products.length; i++) {
      products[i].price = prices[i].unit_amount/100;
    }
  }


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
       <section id="order">
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
      </section>
      <div className={classes['right-container']}>
        <div className={classes.titleLineContainer}>
          <hr className={classes.line} />
          <h3>Teriyaki</h3>
        </div>
        <div className={classes['grid-container']}>
          <div className={classes['grid-item']}>
            <img className={classes.image} src={require('./images/davy.jpg')} alt="background"/>
          </div>
          <div className={classes['grid-item']}>
            <img className={classes.image} src={require('./images/davy.jpg')} alt="background"/>
          </div>
          <div className={classes['grid-item']}>
            <img className={classes.image} src={require('./images/davy.jpg')} alt="background"/>
          </div>
          <div className={classes['grid-item']}>
            <img className={classes.image} src={require('./images/davy.jpg')} alt="background"/>
          </div>
          <div className={classes['grid-item']}>
            <img className={classes.image} src={require('./images/davy.jpg')} alt="background"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order