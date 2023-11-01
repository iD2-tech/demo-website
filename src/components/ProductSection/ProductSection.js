import React, {useState} from 'react'
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
    },
  };

function ProductSection(props) {
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

  const handleOp = (data) => {
    setModalOpSelected(data);
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

  const items = props.items;
  const itemsArray = items.items;

  const openModal = (item) => {
    setShow(true);
    setSelected(item);
    setSelectedSub(item.customization.substitutions);
    setSelectedOp(item.customization.extras);
  }

  const closeModal = () => {
    const obj = {
        itemTitle: selected.title,
        sub: modalSubSelected,
        op: modalOpSelected,
        quant: modalQuant,
        inst: modalInst,
    }
    console.log(obj);
    setShow(false);
    setModalInst('');
    setModalOpSelected([]);
    setModalQuant(1);
    setModalSubSelected([]);
  }
  return (
    <div id={props.id} className={classes.sectionContainer}>
        <SectionTitle title={items.title}/>
        <div className={classes.eachProductContainer}>
            {
                itemsArray.map((item, i) => {
                    return (
                        <EachProduct key={i} onClick={() => openModal(item)} item={item} index={i + 1}/>
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
                            <img className={classes.image} src={selected.img}/>
                        </div>
                        <div className={classes.quantSelect}>
                            <p1>Quantity</p1>
                            <QuantitySelector onUpdate={handleQuant}/>
                        </div>
                    </div>

                    <div className={classes.infoContainer}>
                        <ModalHeader title={selected.title} price={selected.price} description={selected.description} onX={xOut}/>
                        <div className={classes.divider}></div>
                        <ModalOptions options={selectedSub} title="Substitution" onUpdate={handleSub}/>
                        <ModalOptions options={selectedOp} title="Extras" onUpdate={handleOp}/>
                        <SpecialInst onUpdate={handleInst}/>
                        <ModalButton onClick={closeModal}/>
                    </div>

                </div> 
                
                : null}
        </Modal>
    </div>
  )
}

export default ProductSection