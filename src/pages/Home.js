import React, { useEffect } from 'react'
import classes from '../components/Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const nav = useNavigate();
  useEffect(() => {
    window.dispatchEvent(new Event('storage')) // trigger update to header
  }, [])

  const goOrder = () => {
      nav("/order");
  }

  return (

    <div className={classes.container}>
      <button onClick={goOrder} className={classes.button}>
        VIEW MENU
        <AiOutlineArrowRight style={{marginLeft: '15px'}} />
      </button>
    </div>
  )
}

export default Home