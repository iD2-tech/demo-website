import React from 'react'
import classes from '../components/Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {
  return (
    <div className={classes.container}>
      <button className={classes.button}>
          ORDER NOW
          <AiOutlineArrowRight style={{marginLeft: '15px'}}  />
      </button>
    </div>
  )
}

export default Home