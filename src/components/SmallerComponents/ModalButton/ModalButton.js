import React, {useState} from 'react'
import classes from './ModalButton.module.scss';

function ModalButton(props) {


  return (
    <div className={classes.container} onClick={props.onClick}>
      <p1>Add to Order</p1>
    </div>
  )
}

export default ModalButton