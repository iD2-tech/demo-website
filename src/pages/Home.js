import React, { useEffect } from 'react'
import classes from '../components/Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const nav = useNavigate();
  useEffect(() => {
    window.dispatchEvent(new Event('storage')) // trigger update to header
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <div className={classes.container}>
      <section id = "home">
        <button onClick={() => scrollToSection('order')} className={classes.button}>
          VIEW MENU
          <AiOutlineArrowRight style={{marginLeft: '15px'}} />
        </button>
      </section>
    </div>
  )
}

export default Home