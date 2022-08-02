import React from 'react'
import classes from '../components/Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const nav = useNavigate();

  const goOrder = () => {
      nav("/order");
  }

  return (

    <div className={classes.container}>
      <button onClick={goOrder}className={classes.button}>
          ORDER NOW
          <AiOutlineArrowRight style={{marginLeft: '15px'}}  />
      </button>
    </div>
  )
}

export default Home