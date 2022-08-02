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
    getProducts();
    getPrices();
      if (products.length === 0) {
        if (counter < 1) {
          setCounter(counter + 1);
        }
      }
      console.log(products);

  }, [counter])

  const getProducts = async() => {
    fetch('http://localhost:5000/products')
      .then(r => r.json())
      .then(data => {
        var array = data.products;
        setProducts(array);
      });
     
  }

  const getPrices = async() => {

    fetch('http://localhost:5000/prices', {
    }).then(r => r.json())
      .then(data => {
        var array = data.price;
        setPrices(array);
      })
  }
    
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
    nav("/displayMenu", {
      state: {
        productList: array,
        category: category
      }
    })
  }

  const combinePrices = () => {
    for (let i = 0; i < products.length; i++) {
      products[i].price = prices[i].unit_amount/100;
    }
  }


  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <div onClick={() => displayMenu("Spring")} className={classes.item}>
          <img className={classes.image} src={require('./images/SpringPic.png')} alt="background"/>
          <h className={classes.header}>Appetizers</h>
        </div>
        <div onClick={() => displayMenu("Pho")} className={classes.item}>
          <img className={classes.image} src={require('./images/PhoPic.png')} alt="background"/>
          <h className={classes.header}>Pho</h>
        </div>
        <div onClick={() => displayMenu("Mi")} className={classes.item}>
          <img className={classes.image} src={require('./images/BahnPic.png')} alt="background"/>
          <h className={classes.header}>Banh Mi</h>
        </div>
      </div>
    </div>
  )
}

export default Order