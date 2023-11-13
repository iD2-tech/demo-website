import React from 'react'
import classes from './EachProduct.module.scss';
import img from '../../../assets/images/menuImage.png'

function EachProduct(props) {

  const item = props.item;
  
  return (
    <div className={classes.container} onClick={props.onClick}>
      <div className={classes.imageContainer}> 
        <img style={{objectFit: 'cover'}} alt="..." loading="lazy" width="100%" height="100%" src={item.images[0]} />
      </div>
     
      <div className={classes.titleAndPrice}>
        <p1>{props.index}. {item.name}</p1>
        <p2>${item.price}</p2>
      </div>

    </div>
  )
}

export default EachProduct