import React from 'react'
import classes from './ModalHeader.module.scss';
import img from '../../../assets/images/menuImage.png'

function ModalHeader(props) {
  
  return (
    <div className={classes.container}>
      <div className={classes.nameContain}>
        <p1>{props.title}</p1>
        <div className={classes.xButton} onClick={props.onX}><p1 style={{fontSize: '20px'}}>x</p1></div>
      </div>
      
      <p2>${props.price}</p2>
      <p3>{props.description}</p3>
    </div>
  )
}

export default ModalHeader