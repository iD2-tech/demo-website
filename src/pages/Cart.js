import React, { Fragment, useEffect, useState } from 'react'
import classes from '../components/Cart.module.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const nav = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  var products = [];


  useEffect(() => {
    var cartJSON = localStorage.getItem("cart");
    if(cartJSON === null) {
      cartJSON = [];
    } else {
      cartJSON = JSON.parse(cartJSON);
    }
    setCart(cartJSON);
    products = cart;
    updateCartTotal();
    console.log(products);
  }, [])

  // updates the cart totals
  const updateCartTotal = () => {
    var currentCart = localStorage.getItem("cart");
    if(currentCart === null) {
      currentCart = [];
    } else {
      currentCart = JSON.parse(currentCart);
    }

    let sum = 0;
    for (let i = 0; i < currentCart.length; i++) {
      sum += currentCart[i].price * currentCart[i].quantity;
    }
    setSubtotal(sum.toFixed(2));

    const taxEstimate = sum * 0.093
    setTaxes(taxEstimate.toFixed(2));
    console.log(taxes);

    const tempTotal = sum + taxEstimate;
    setTotal(tempTotal.toFixed(2));
    console.log(total);
  }

  const removeFromCart = () => {
    console.log("removeFromCart");
  }

  const minusButtonClicked = () => {
    console.log("-");
  }

  const plusButtonClicked = () => {
    console.log("+");
  }

  const checkoutButtonClicked = () => {
    console.log("checkout");
  }

  return (
    <div className={classes.container}>

      {/* Products Column */}
      <div className={classes.productsContainer}>

        {/* top bar label */}
        <div className={classes.headerContainer}>
          <p className={classes.categoryHeader}>Your Order</p>
        </div>

        {/* Products */}
        <div className={classes.productsMap}>
          {cart.map((product) => (
            <div key={product.ID} className={classes.product}>

              {/* image container */}
              <div className={classes.productImage}>
                <img className={classes.image} src={product.images[0]} alt="background" />
              </div>

              {/* product info container */}
              <div className={classes.productMetaData}>

                {/* product name container */}
                <div className={classes.productNameContainer}>
                  <p>{product.name}</p>
                </div>

                {/* product price container */}
                <div className={classes.productPriceContainer}>
                  <b>${product.price}</b>
                </div>

                {/* quantity button container */}
                <div className={classes.quantityButtonContainer}>

                  {/* mins sign container */}
                  <div className={classes.minusSign}>
                    <button className={classes.adjustMinusButton} onClick={minusButtonClicked}>
                      -
                    </button>

                  </div>

                  {/* quantity container */}
                  <div className={classes.quantityContainer}>
                    {product.quantity}
                  </div>

                  {/* plus sign container */}
                  <div className={classes.plusSign}>
                    <button className={classes.adjustPlusButton} onClick={plusButtonClicked}>
                      +
                    </button>
                  </div>

                </div>

              </div>


              {/* remove from cart container */}
              <div className={classes.removeFromCartContainer}>
                <button className={classes.removeButton} onClick={removeFromCart}>
                  X
                </button>

              </div>

            </div>
          ))

          }
        </div>

      </div>

      <div className={classes.line}>

      </div>

      {/* Subtotal Column */}
      <div className={classes.reviewContainer}>

        {/* top bar label */}
        <div className={classes.headerContainer}>
          <p className={classes.categoryHeader}>Review Order</p>
        </div>

        {/* items list */}
        <div className={classes.subtotalMap}>
          {cart.map((product) => (
            <div key={product.ID} className={classes.item}>

              <div className={classes.quantityRow}>
                <div className={classes.quantityDisplay}>
                  {product.quantity}
                </div>

                <div className={classes.productNameDisplay}>
                  {product.name}
                </div>

                <div className={classes.productPriceDisplay}>
                  ${product.price * product.quantity}
                </div>

              </div>

            </div>
          ))
          }
        </div>

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

          {/* checkout button */}
          <button className={classes.checkoutButton} onClick={checkoutButtonClicked}>
            Checkout
          </button>


        </div>

      </div>
    </div >
  )
}

// comment

export default Cart