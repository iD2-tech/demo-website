import React, {useState} from 'react'
import classes from './QuantitySelector.module.scss';

function QuantitySelector(props) {

  const [count, setCount] = useState(1);

  return (
    <div className={classes.container}>
        <button onClick={() => { if (count > 0 ) {props.onUpdate(count - 1); setCount(count - 1)}}}>-</button>
        <p2>{count}</p2>
        <button onClick={() => {props.onUpdate(count + 1); setCount(count + 1)}}>+</button>
    </div>
  )
}

export default QuantitySelector