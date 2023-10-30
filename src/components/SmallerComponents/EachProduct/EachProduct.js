import React from 'react'
import classes from './EachProduct.module.scss';
import img from '../../../assets/images/menuImage.png'

function EachProduct(props) {

  const item = props.item;
  
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}> 
        <img className={classes.image} src={item.img} />
      </div>
     
      <div className={classes.titleAndPrice}>
        <p1>{props.index}. {item.title}</p1>
        <p2>${item.price}</p2>
      </div>

    </div>
  )
}

export default EachProduct