import React, { Fragment, useEffect, useState } from 'react';
import classes from './Cart.module.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Navigate, useNavigate, Link } from 'react-router-dom';
//just for testing code
import phoImage from '../../assets/images/PhoPic.png';


import ProductQuantity from '../../components/ProductQuantity/ProductQuantity';
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton';
import CartProduct from '../../components/CartProduct/CartProduct';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

const stripePromise = loadStripe('pk_test_51LPzSaAmJKzU86rc7blGPoGpWD2vDXq7lodk2F4LKPAhxChyfNN4XFYX1GEbxAYTojFIFKsnWTlqJxG9hE9ppGaL002clKaclh');

const Cart = () => {
  const nav = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  var products = [];
  const TAX_RATE = 0.093;

  useEffect(() => {
    // get cart info from localStorage and set info
    var cartJSON = localStorage.getItem("cart");
    if (cartJSON === null) {
      cartJSON = [];
    } else {
      cartJSON = JSON.parse(cartJSON);
    }
    setCart(cartJSON);
    products = cart;
    updateCartTotal();
    console.log("TEST5");
    console.log(products);
    console.log("TEST6");
  }, [])

  // updates the cart totals
  const updateCartTotal = () => {
    var currentCart = localStorage.getItem("cart");
    if (currentCart === null) {
      currentCart = [];
    } else {
      currentCart = JSON.parse(currentCart);
    }

    let sum = 0;
    for (let i = 0; i < currentCart.length; i++) {
      sum += getTotalCost(currentCart[i]);
    }
    setSubtotal(sum.toFixed(2));

    const taxEstimate = sum * TAX_RATE;
    setTaxes(taxEstimate.toFixed(2));
    console.log(taxes);

    const tempTotal = sum + taxEstimate;
    setTotal(tempTotal.toFixed(2));
    console.log(total);
    window.dispatchEvent(new Event('storage')) // trigger update to header

  }

  // X button to remove from cart
  const removeFromCart = (e, index) => {
    e.preventDefault();
    var cartCopy = [...cart];
    cartCopy.splice(index, 1);
    setCart(cartCopy);
    localStorage.setItem("cart", JSON.stringify(cartCopy));
    updateCartTotal();
  }

  // - button to decrement one from cart quantity, removes from cart if quantity = 0
  const minusButtonClicked = (e, index) => {
    e.preventDefault();
    var cartCopy = [...cart];
    cartCopy[index].quantity--;
    if (cartCopy[index].quantity == 0) {
      removeFromCart(e, index);
    } else {
      setCart(cartCopy);
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      updateCartTotal();
    }

  }

  // increments cart quantity by one
  const plusButtonClicked = (e, index) => {
    e.preventDefault();
    var cartCopy = [...cart];
    cartCopy[index].quantity++;
    setCart(cartCopy);
    localStorage.setItem("cart", JSON.stringify(cartCopy));
    updateCartTotal();
  }

  // gets total cost of product
  function getTotalCost(product) {
    let sum = product.price;
    product.customizations.forEach(item => {
      sum += item.price;
    });
    return sum * product.quantity;
  }

  // create stripe checkout session
  const checkoutButtonClicked = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      const response = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      });

      const session = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error(error);
      }
    } else {
      alert("cart is empty!");
    }
  }

  return (
    <div className={classes.container}>

      {/* Products Column */}
      <div className={classes.productsContainer}>

        {/* top bar label */}
        <div className={classes.headerContainer}>
          <p className={classes.categoryHeader}>Your Order</p>
        </div>

        {/* EACH PRODUCT HERE SHOULD BE A 'CARTPRODUCT' COMPONENT IN THE COMPONENT FOLDER */}
        {/* Products */}
        <div className={classes.productsMap}>
          {cart.map((product, index) => (
            <CartProduct
              key={product.ID}
              product={product}
              index={index}
              minusButtonClicked={(e) => minusButtonClicked(e, index)}
              plusButtonClicked={(e) => plusButtonClicked(e, index)}
              removeFromCart={(e) => removeFromCart(e, index)}
            />
          ))}
        </div>

      </div>

      <div className={classes.line} />

      {/* Subtotal Column */}
      <div className={classes.verticalLine}></div>
      <div className={classes.reviewContainer}>

        {/* top bar label */}
        <div className={classes.headerContainer}>
          <p className={classes.categoryHeader}>Review Order</p>
        </div>

        {/* items list */}
        <div className={classes.subtotalMap}>
        {cart.map((product, index) => (
          <div key={index} className={classes.item}>
              <div className={classes.productNameDisplay}>
                {product.name}
              </div>
              <div className={classes.productPriceDisplay}>
               ${getTotalCost(product).toFixed(2) }
              </div>
          </div>
        ))}
        </div>

        <div className={classes.horizontalLine} />

        {/* taxes and total */}
        <div className={classes.taxesTotalContainer}>
          {/* taxes container */}
          <div className={classes.taxesContainer}>
            <div className={classes.taxLabel}>
              Tax
            </div>
            <div className={classes.displayTax}>
              <p className={classes.totalTax}> ${taxes} </p>
            </div>
          </div>
          {/* total Container */}
          <div className={classes.totalContainer}>
            <div className={classes.taxLabel}>
              Total
            </div>
            <div className={classes.displayTax}>
              <p className={classes.totalTax}> ${total} </p>
            </div>
          </div>
          {/* THIS CHECKOUT BUTTON SHOULD BE A COMPONENT */}
          {/* checkout button */}
          <CheckoutButton onClick={checkoutButtonClicked} />
        </div>
      </div>
    </div>
  );
}

// comment

// I THINK THIS PAGE IS PRETTY GOOD, JUST NEED TO MAKE SURE THE UI WORKS FOR DIFFERENT SCREEN SIZES

export default Cart