import React from 'react'
import classes from './Product.module.scss';
import SectionTitle from '../SmallerComponents/SectionTitle/SectionTitle.js';
import EachProduct from '../SmallerComponents/EachProduct/EachProduct.js';

function ProductSection(props) {
  const items = props.items;
  const itemsArray = items.items;

  return (
    <div className={classes.sectionContainer}>
        <SectionTitle title={items.title}/>
        <div className={classes.eachProductContainer}>
            {
                itemsArray.map((item, i) => {
                    return (
                        <EachProduct item={item} index={i + 1}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ProductSection