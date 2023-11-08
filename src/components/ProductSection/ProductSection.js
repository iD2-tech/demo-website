import React, { useState } from 'react'
import classes from './Product.module.scss';
import SectionTitle from '../SmallerComponents/SectionTitle/SectionTitle.js';
import EachProduct from '../SmallerComponents/EachProduct/EachProduct.js';
import Modal from 'react-modal'
import ModalHeader from '../SmallerComponents/ModalHeader/ModalHeader';
import ModalOptions from '../SmallerComponents/ModalOptions/ModalOptions.js';
import SpecialInst from '../SmallerComponents/SpecialInst/SpecialInst';
import QuantitySelector from '../SmallerComponents/QuantitySelector/QuantitySelector';
import ModalButton from '../SmallerComponents/ModalButton/ModalButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    height: '90%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 9999999999,
  },
};

function ProductSection(props) {

  const items = props.items;
  const itemsArray = items.items;
  const customArray = items.customization;

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectedSub, setSelectedSub] = useState([]);
  const [selectedOp, setSelectedOp] = useState([]);

  const [modalSubSelected, setModalSubSelected] = useState([]);
  const [modalOpSelected, setModalOpSelected] = useState([]);
  const [modalQuant, setModalQuant] = useState(1);
  const [modalInst, setModalInst] = useState();

  const handleSub = (data) => {
    setModalSubSelected(data);
  }

  // adds customizations
  const handleOp = (data) => {
    console.log(data);
    const arr = [];
    for (const d of data) {
      for (const item of customArray) {
        if (d === item.name) {
          arr.push(item);
        }
      }
    }
    setModalOpSelected(arr);
  }

  const handleQuant = (data) => {
    setModalQuant(data);
  }

  const handleInst = (data) => {
    setModalInst(data);
  }

  const xOut = () => {
    setShow(false);
  }

  const openModal = (item) => {
    setShow(true);
    setSelected(item);
    setSelectedOp(item.customization);
  }

  function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const sortedArr1 = arr1.map(obj => JSON.stringify(obj)).sort();
    const sortedArr2 = arr2.map(obj => JSON.stringify(obj)).sort();
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i].localeCompare(sortedArr2[i]) != 0) {
        return false;
      }
    }

    return true;
  }

  function compareStrings(string1, string2) {
    if (!string1 || !string2) {
      return false;
    }
    if (string1.length !== string2.length) {
      return false;
    }
    return string1.localeCompare(string2) == 0
  }

  const closeModal = () => {
    const obj = {
      itemTitle: selected,
      op: modalOpSelected,
      quant: modalQuant,
      inst: modalInst,
    }

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
        if (cartJSON[cartParser].id === selected.id
          && compareArrays(cartJSON[cartParser].customizations, modalOpSelected)
          && compareStrings(cartJSON[cartParser].instructions, modalInst)) {
          index = cartParser;
          break;
        }
      }
    }

    // set vars accordingly
    const additionalQuantity = modalQuant;
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
        default_price: selected.default_price,
        id: selected.id,
        images: selected.images,
        key: selected.key,
        name: selected.name,
        price: selected.price,
        quantity: additionalQuantity,
        instructions: modalInst,
        customizations: modalOpSelected
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
    console.log("\tlocal storage JSON: ");
    console.log(localStorage.getItem('cart'));
    setShow(false);
    setModalInst('');
    setModalOpSelected([]);
    setModalQuant(1);
    setModalSubSelected([]);
    window.dispatchEvent(new Event('storage')) // trigger update to header
  }

  return (
    <div id={props.id} className={classes.sectionContainer}>
      <SectionTitle title={items.title} />
      <div className={classes.eachProductContainer}>
        {
          itemsArray.map((item, i) => {
            return (
              <EachProduct key={i} onClick={() => openModal(item)} item={item} index={i + 1} />
            )
          })
        }
      </div>
      <Modal isOpen={show} style={customStyles} ariaHideApp={false}>
        {
          selected != null ?

            <div className={classes.modalInfo}>
              <div>
                <div className={classes.imageContainer}>
                  <img className={classes.image} src={selected.images} />
                </div>
                <div className={classes.quantSelect}>
                  <p1>Quantity</p1>
                  <QuantitySelector onUpdate={handleQuant} />
                </div>
              </div>

              <div className={classes.infoContainer}>
                <ModalHeader title={selected.name} price={selected.price} description={selected.description} onX={xOut} />
                <div className={classes.divider}></div>
                <ModalOptions options={customArray} title="Options" onUpdate={handleOp} />
                <SpecialInst onUpdate={handleInst} />
                <ModalButton onClick={closeModal} />
              </div>

            </div>

            : null}
      </Modal>
    </div>
  )
}

export default ProductSection