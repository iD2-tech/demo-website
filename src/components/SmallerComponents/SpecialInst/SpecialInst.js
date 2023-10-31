import React, {useState} from 'react'
import classes from './SpecialInst.module.scss';

function SpecialInst(props) {
  
  const [text, setText] = useState('');
  
  const handleChange = (event) => {
    setText(event.target.value);
    props.onUpdate(event.target.value);
  };

  return (
    <div className={classes.container}>
      <p1>Special Instructions</p1>
      <textarea
        value={text}
        rows={2}
        onChange={handleChange}
        placeholder="e.g., no pepper, salt, and sugar please."
      ></textarea>
    </div>
  )
}

export default SpecialInst