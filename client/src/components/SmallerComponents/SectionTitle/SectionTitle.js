import React from 'react'
import classes from './SectionTitle.module.scss';

function SectionTitle(props) {

  return (
    <div className={classes.titleContainer}>
      <p2>{props.title}</p2>
      <div className={classes.line}></div>
    </div>
  )
}

export default SectionTitle