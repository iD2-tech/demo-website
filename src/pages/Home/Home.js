import React, { useEffect, useState } from 'react'
import classes from './Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import data from '../../assets/data.json';
const Home = () => {

  const nav = useNavigate();
  useEffect(() => {
    window.dispatchEvent(new Event('storage')) // trigger update to header
    console.log(data.categories)
  }, [])

  const goOrder = () => {
    nav("/order");
  }

  const [scrollPercentage, setScrollPercentage] = useState(0.0);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight * (3.0 / 7.0);

      const newScrollPercentage = (scrollY / (pageHeight - windowHeight)) * 100;

      setScrollPercentage(newScrollPercentage);
      console.log(scrollPercentage);

      if (scrollPercentage > 123.42324815124046 && !isMenuFixed) {
        setIsMenuFixed(true);
      } else if (scrollPercentage <= 123.42324815124046 && isMenuFixed) {
        setIsMenuFixed(false);
      }

      const sections = ['whatIsContainer', 'ourVisionContainer', 'keyFeaturesContainer', 'visitContainer'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      const whatIsContainer = document.getElementById('whatIsContainer');
      if (whatIsContainer) {
        const rect = whatIsContainer.getBoundingClientRect();
        if (rect.top > windowHeight * 0.5) {
          setActiveSection(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPercentage]);

  useEffect(() => {
    const menuItems = document.querySelectorAll('[data-target]');

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', () => {
        const targetId = menuItem.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });

    return () => {
      menuItems.forEach((menuItem) => {
        menuItem.removeEventListener('click', () => { });
      });
    };
  }, []);

  return (

    <div className={classes.container}>
      <div className={classes.introSlide}>
        <button onClick={goOrder} className={classes.button}>
          ORDER NOW
          <AiOutlineArrowRight style={{ marginLeft: '15px' }} />
        </button>
      </div>

      <div className={classes.orderContainer}>
        <div className={classes.menuContainer}>
          <text className={classes.menuTitle}>MENU</text>
          {data.categories.map((category) => (
             <text className={classes.category}>{category}</text>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home