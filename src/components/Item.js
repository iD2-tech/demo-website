import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../components/Item.module.scss';

function Item(props) {
  const { items } = props;
  const nav = useNavigate();
  const [products, setProducts] = useState(items);
  const [prices, setPrices] = useState(items.map((item) => ({ price: item.price })));
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectedValue, setSelectedValue] = useState(0);
  const [triggerRerender, setTriggerRerender] = useState(0);

  const openModal = (item) => {
    setShow(true);
    setSelected(item);
    setSelectedValue(item.quantity || 1);
  };

  const closeModal = (item) => {
    setShow(false);

    let cartJSON = localStorage.getItem('cart');
    cartJSON = JSON.parse(cartJSON);
    if (cartJSON === null) {
      cartJSON = [];
    }

    let index = -1;
    for (let cartParser = 0; cartParser < cartJSON.length; cartParser++) {
      if (cartJSON[cartParser] !== null) {
        if (cartJSON[cartParser].id === item.id) {
          index = cartParser;
          break;
        }
      }
    }

    const additionalQuantity = selectedValue;

    if (index >= 0) {
      const originalQuantity = cartJSON[index].quantity;
      const updatedQuantity = originalQuantity + additionalQuantity;
      cartJSON[index].quantity = updatedQuantity;
    } else {
      cartJSON.push({
        default_price: item.default_price,
        id: item.id,
        images: item.images,
        key: item.key,
        name: item.name,
        price: item.price,
        quantity: additionalQuantity,
      });
    }

    for (let k = 0; k < cartJSON.length; k++) {
      if (cartJSON[k] != null) {
        if (cartJSON[k].quantity <= 0) {
          delete cartJSON[k];
        }
      }
    }

    const filtered = cartJSON.filter(function (el) {
      return el != null;
    });

    localStorage.setItem('cart', JSON.stringify(filtered));
    setTriggerRerender(triggerRerender + 1);
    setSelectedValue(0);
    window.dispatchEvent(new Event('storage'));
  };

  const decreaseQuantity = () => {
    if (selectedValue > 0) {
      setSelectedValue((prevValue) => prevValue - 1);
    }
  };

  const increaseQuantity = () => {
    setSelectedValue((prevValue) => prevValue + 1);
  };

  useEffect(() => {
    window.dispatchEvent(new Event('storage'));
    getProducts();
    getPrices();
    if (products.length === 0) {
      if (counter < 1) {
        setCounter(counter + 1);
      }
    }
  }, [counter]);

  const getProducts = async () => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        var array = data.products;
        setProducts(array);
      });
  };

  const getPrices = async () => {
    fetch('http://localhost:3000/prices')
      .then((response) => response.json())
      .then((data) => {
        var array = data.price;
        setPrices(array);
      });
  };

  const combinePrices = () => {
    for (let i = 0; i < products.length; i++) {
      products[i].price = prices[i].unit_amount / 100;
    }
  };

  const displayMenu = (category) => {
    combinePrices();
    var array = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].name.includes(category)) {
        array.push(products[i]);
      }
    }

    var categoryName;
    if (category.includes('Spring')) {
      categoryName = 'Appetizers';
    } else if (category.includes('Pho')) {
      categoryName = 'Pho';
    } else {
      categoryName = 'Banh Mi';
    }

    nav('/displayMenu', {
      state: {
        productList: array,
        category: categoryName,
        allProducts: products,
      },
    });
  };

  return (
    <div>
      {items.map((item, index) => (
        <div className={`${classes['grid-item']} ${classes['grid-item-overlay']}`} key={index}>
            <img className={classes.image} src={item.img} alt="background" />
          <div className={`${classes['red-box']} ${item.selectedValue > 0 ? classes.visible : ''}`}>
            <span className={classes['red-box-text']}>
              {item.selectedValue}
              <br />
              in your cart
            </span>
          </div>
          <div className={classes['image-text']}>
            <p>{item.item}</p>
            <div className={classes['price-button-container']}>
              <p className={classes.price}>{item.price}</p>
              <div className={classes['button-container']}>
                <button className={classes.button} onClick={() => decreaseQuantity()}>-</button>
                <button className={classes.button} onClick={() => increaseQuantity()}>+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;