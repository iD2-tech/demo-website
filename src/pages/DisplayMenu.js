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

    useEffect(() => {
        console.log(allProducts);
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
      setShow(false);
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.includes(props)) {
          allProducts[i].quantity = allProducts[i].quantity + selectedValue;
        }
      }
      console.log(allProducts);
    }
    


  return (
    <div className ={classes.container}>
      <div className={classes.headerContainer}>
        <h className={classes.header}>
          {category}  
        </h>
        </div>
      <div className={classes.menu}>
        {products.map(product => (
          <div>
             <Modal isOpen={show} style={customStyles}>
              {selected != null ?  
                <div className={classes.modalInfo}>
                  <div className={classes.modalTitle}>
                    <h className={classes.modalName}>{selected.name}</h>
                    <h className={classes.modalPrice}>${selected.price}</h>
                  </div>
                  <h className={classes.modalDescription}>{selected.description}</h>
                  <QuantityPicker smooth width='8rem' onChange={(value) => {setSelectedValue(value)}} />
                  <button  onClick={() => {closeModal(selected.name)}} className={classes.modalButton}>Add To Cart</button>
                </div> : null}   
            </Modal>
      <div onClick={() => {openModal(product)}} className={classes.item}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={product.images[0]} alt="background"/>
        </div> 
        <div className={classes.name}>
          <h className={classes.title}>{product.name}</h>
          <h className={classes.price}>${product.price}</h>
        </div>
        <h className={classes.description}>{product.description}</h>
      </div>
      </div>
    ))}
    </div>
    </div>
  )
}

export default DisplayMenu