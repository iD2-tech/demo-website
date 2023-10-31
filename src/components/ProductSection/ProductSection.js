import React, {useState} from 'react'
import classes from './Product.module.scss';
import SectionTitle from '../SmallerComponents/SectionTitle/SectionTitle.js';
import EachProduct from '../SmallerComponents/EachProduct/EachProduct.js';
import Modal from 'react-modal'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '50px',
      marginRight: '-50%',
      width: '50%',
      height: '80%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  };

function ProductSection(props) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});
  const items = props.items;
  const itemsArray = items.items;

  const openModal = (item) => {
    setShow(true);
    setSelected(item);
  }

  const closeModal = () => {
    setShow(false);
  }

  return (
    <div className={classes.sectionContainer}>
        <SectionTitle title={items.title}/>
        <div className={classes.eachProductContainer}>
            {
                itemsArray.map((item, i) => {
                    return (
                        <EachProduct onClick={() => openModal(item)} item={item} index={i + 1}/>
                    )
                })
            }
        </div>
        <Modal isOpen={show} style={customStyles} ariaHideApp={false}>
              {selected != null ?
                
                <div className={classes.modalInfo}>
                    
                    <div className={classes.imageContainer}>
                        <img className={classes.image} src={selected.img}/>
                    </div>

                    {/* <div className={classes.infoContainer}>
                        <ModalHeader />
                        <div className={classes.divider}></div>
                        <ModalOptions />
                        <ModalOptions />

                        <div className={classes.buttonContainer}>
                            <QuantitySelector />
                            <ModalButton />
                        </div>
                    </div> */}

                </div> 
                
                : null}
        </Modal>
    </div>
  )
}

export default ProductSection