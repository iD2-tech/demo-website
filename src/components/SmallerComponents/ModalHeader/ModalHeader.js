import React from 'react'
import classes from './ModalHeader.module.scss';
import img from '../../../assets/images/menuImage.png'

function ModalHeader(props) {
  
  return (
    <div className={classes.container}>
      <p1>{props.title}</p1>
      <p2>${props.price}</p2>
      <p3>{props.description}</p3>
    </div>
  )
}

export default ModalHeader