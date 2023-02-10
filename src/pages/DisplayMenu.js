import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from '../components/DisplayMenu.module.scss';
import Modal from 'react-modal'
import { QuantityPicker } from 'react-qty-picker';


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
     
    // helper function checks if quantity set is going to be negative, if so sets to 0
    const checkNegative = (quantity) => {
      if(quantity < 0) {
        return 0;
      }
      return quantity;
    }
    
    // closes pop up
    // adds the quantity the allProducts when closing
    // this gets reset rn tho so I think we gotta get it from the database with like a checkout session
    const closeModal = (props) => {
      console.log(allProducts);
      console.log("the following logs test the add to cart functions: ");
      setShow(false);
      
      
      // get the cart info from local storage
      // if it doesn't exist cartJSON is just set to empty
      var cartJSON = localStorage.getItem("cart");
      cartJSON = JSON.parse(cartJSON);
      console.log(props);
      
      // loop searches for the correct product
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === props) { // finds correct product from given parameter

          // sets vars accordingly
          const productID = allProducts[i].id;
          var additionalQuantity = selectedValue; 
          console.log("\tselected: " + selectedValue);


          if(cartJSON != null) { // needed because NULL.hasOwnProperty throws error

             // if cart already has the product we are adding to cart
            if(cartJSON.hasOwnProperty(productID)) { 
              var quantity = cartJSON[productID];
              console.log("\tprevious quantity : "+ cartJSON[productID]);
              quantity += additionalQuantity; // update the quantity with previous value + selected value

              quantity = checkNegative(quantity);

              cartJSON[productID] = quantity; // sets the quantity to updated value
              console.log("\tupdated quantity: " + quantity);

            // if cart doesn't already have the product we are adding to cart just add it to the JSON
            } else { 
              additionalQuantity = checkNegative(additionalQuantity);

              cartJSON = {...cartJSON, [productID] : additionalQuantity};
            }
          
          // if the cart is empty just add it to the JSON
          } else { 
            additionalQuantity = checkNegative(additionalQuantity);
            cartJSON = {...cartJSON, [productID] : additionalQuantity};
          }
          
        }
      }

      

      // removes all zero-value entries from the cart
      Object.entries(cartJSON).forEach((entry) => { 
        const [key, value] = entry;
        if(value === 0) {
          delete cartJSON[key];
        } 
      });


      localStorage.setItem("cart", JSON.stringify(cartJSON)); // update localStorage
      console.log("\tlocal storage JSON: " + localStorage.getItem("cart"));


      setTriggerRerender(triggerRerender + 1);
      setSelectedValue(0); // reset the selectedValue var
      window.dispatchEvent(new Event('storage')) // trigger update to header
    }

  return (
    <div className ={classes.container}>
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
                  <QuantityPicker smooth width='8rem' onChange={(value) => {setSelectedValue(value)}} />
                  <button  onClick={() => {closeModal(selected.name)}} className={classes.modalButton}>Add To Cart</button>
                </div> : null}   
            </Modal>
      <div onClick={() => {openModal(product)}} className={classes.item}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={product.images[0]} alt="background"/>
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