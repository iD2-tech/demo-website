import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from '../components/DisplayMenu.module.scss';
import Modal from 'react-modal'


const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '50px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

const DisplayMenu = () => {

  const location = useLocation();
  const nav = useNavigate();
  const [products, setProducts] = useState(location.state.productList);
  const [category, setCategory] = useState(location.state.category);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectedValue, setSelectedValue] = useState(0);
  const [allProducts, setAllProducts] = useState(location.state.allProducts);
  const [triggerRerender, setTriggerRerender] = useState();

  useEffect(() => {
    // console.log(allProducts);
    // console.log(products.imag)
  }, [])

  // opens pop up
  const openModal = (props) => {
    setShow(true);
    setSelected(props);
  }

  // closes pop up
  // adds the quantity the allProducts when closing
  // this gets reset rn tho so I think we gotta get it from the database with like a checkout session
  const closeModal = (props) => {
    console.log("the following logs test the add to cart functions: ");
    setShow(false);

    // get the cart info from local storage
    // if it doesn't exist cartJSON is just set to empty brackets
    var cartJSON = localStorage.getItem("cart");
    cartJSON = JSON.parse(cartJSON);
    if (cartJSON === null) {
      cartJSON = [];
    }

    // sets index variable to index of product in cart if exists, -1 otherwise
    var index = -1;
    for (let cartParser = 0; cartParser < cartJSON.length; cartParser++) {
      if (cartJSON[cartParser] !== null) {
        if (cartJSON[cartParser].id === props.id) {
          index = cartParser;
          break;
        }
      }
    }

    // set vars accordingly
    const additionalQuantity = selectedValue;
    console.log("\tselected: " + additionalQuantity);

    // if product already exists in cart
    if (index >= 0) {
      //get original quantity
      const originalQuantity = cartJSON[index].quantity;
      console.log("\tprevious quantity: " + originalQuantity);

      //update the cart with new quantity
      const updatedQuantity = originalQuantity + additionalQuantity;
      console.log("\tupdated quantity: " + updatedQuantity);
      cartJSON[index].quantity = updatedQuantity;

      // if product is not in the cart yet
    } else {
      cartJSON.push({
        default_price: props.default_price,
        id: props.id,
        images: props.images,
        key: props.key,
        name: props.name,
        price: props.price,
        quantity: additionalQuantity
      })

    }

    // removes all negative/zero/null quantity entries from the cart
    for (let k = 0; k < cartJSON.length; k++) {
      if (cartJSON[k] != null) {
        if (cartJSON[k].quantity <= 0) {
          delete cartJSON[k];
        }
      }
    }
    var filtered = cartJSON.filter(function (el) {
      return el != null;
    });



    localStorage.setItem("cart", JSON.stringify(filtered)); // update localStorage
    console.log("\tlocal storage JSON: " + localStorage.getItem("cart"));


    setTriggerRerender(triggerRerender + 1);
    setSelectedValue(0); // reset the selectedValue var
    window.dispatchEvent(new Event('storage')) // trigger update to header
  }

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <p className={classes.header}>
          {category}
        </p>
      </div>
      <div className={classes.menu}>
        {products.map(product => (
          <div key={product.id}>
            <Modal isOpen={show} style={customStyles} ariaHideApp={false}>
              {selected != null ?
                <div className={classes.modalInfo}>
                  <div className={classes.modalTitle}>
                    <p className={classes.modalName}>{selected.name}</p>
                    <p className={classes.modalPrice}>${selected.price}</p>
                  </div>
                  <p className={classes.modalDescription}>{selected.description}</p>
                  {/* <QuantityPicker smooth width='8rem' onChange={(value) => { setSelectedValue(value) }} /> */}
                  <button onClick={() => {setSelectedValue(2)}}>Increase quantity</button>

                  {/* minus setSelectedValue(selected - 1)
                  plus setSelectedValue(selected + 1) */}
                  <button onClick={() => { closeModal(selected) }} className={classes.modalButton}>Add To Cart</button>
                </div> : null}
            </Modal>
            <div onClick={() => { openModal(product) }} className={classes.item}>
              <div className={classes.imageContainer}>
                <img className={classes.image} src={product.images[0]} alt="background" />
              </div>
              <div className={classes.name}>
                <p className={classes.title}>{product.name}</p>
                <p className={classes.price}>${product.price}</p>
              </div>
              <p className={classes.description}>{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayMenu