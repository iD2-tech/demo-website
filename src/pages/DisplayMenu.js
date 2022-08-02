import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import classes from '../components/DisplayMenu.module.scss';

const DisplayMenu = () => {

    const location = useLocation();
    const [products, setProducts] = useState(location.state.productList);
    const [category, setCategory] = useState(location.state.category);

    useEffect(() => {
        console.log(products);
    }, [])

  return (
    <div className ={classes.container}>
        <h className={classes.header}>
          {category}  
        </h>
      <div className={classes.menu}>
        {products.map(product => (
      <div className={classes.item}> 
        <div className={classes.name}>
          <h>{product.name}</h>
          <h>{product.price}</h>
        </div>
        <h className={classes.description}>{product.description}</h>
      </div>
    ))}
    </div>
    </div>
  )
}

export default DisplayMenu