import React, { useEffect, useState, useRef } from 'react'
import classes from './Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import data from '../../assets/data.json';
import ProductSection from '../../components/ProductSection/ProductSection';
import image from '../../assets/images/menuImage.png';
import globalInfo from '../../assets/data.json';

const Home = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0.0);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const [sectionArrayy, setSectionArray] = useState([]);
  const divRef = useRef(null);
  const introRef = useRef(null);

  const nav = useNavigate();
  useEffect(() => {
    window.dispatchEvent(new Event('storage')) // trigger update to header
    console.log(data.categories)
  }, [])

  const goOrder = () => {
    nav("/order");
  }

  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
      window.dispatchEvent(new Event('storage')) // trigger update to header
      if (products.length == 0 || prices.length == 0) {
        getProducts();
        getPrices();
      } else {
        combinePrices();
      }
    }, [products])
  
    const getProducts = async () => {
      fetch('http://localhost:3000/products')
        .then(r => r.json())
        .then(data => {
          var array = data.products;
          setProducts(array);
        });
    }
  
    // get all prices from stripe
    const getPrices = async () => {
      fetch('http://localhost:3000/prices', {
      }).then(r => r.json())
        .then(data => {
          var array = data.price;
          setPrices(array);
        })
    }
  
    // combines products to prices
    const combinePrices = () => {

    // create section array
    const sectionArray = [];
    for (let i = 0; i < data.categories.length; i++) {
      sectionArray.push({title: data.categories[i].title, id: data.categories[i].id, items: [], customization: []});
    }

  // edit prices
  // put each item into its respective category in the section array
      for (let i = 0; i < products.length; i++) {
        products[i].price = prices[i].unit_amount / 100;
        
        if (products[i].metadata.customization === 'true') {
          const catNames = products[i].metadata.category.split(', ');
          console.log(catNames)
          for (const catName of catNames) {
            const category = sectionArray.find((cat) => cat.id === catName);
            if (category) {
              category.customization.push(products[i]);
            }
          }
        } else {
          const category = sectionArray.find((cat) => cat.id === products[i].metadata.category);
          if (category) {
            category.items.push(products[i]);
          }
        }
      }
  console.log(products)
  setSectionArray(sectionArray);
    }


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight * (3.0 / 7.0);

      const newScrollPercentage = (scrollY / (pageHeight - windowHeight)) * 100;

      setScrollPercentage(newScrollPercentage);
      const divTop = divRef.current.getBoundingClientRect().top;
      setScrollTrigger(Math.max(scrollTrigger, divTop))

      setIsMenuFixed(scrollY > scrollTrigger);

      let sections = [];
      sectionArrayy.forEach(element => {
        sections.push(element.id);
      });
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPercentage]);
  
  const restaurantImage = globalInfo.backgroundImage;

  return (

    <div className={`${classes.container} ${classes.bleedContent}`}>
      <div className={classes.introSlide} style={{ backgroundImage: `url(${restaurantImage})` }}>
      </div>

      <div className={classes.orderContainer} ref={divRef}>
        <div className={`${classes.menuContainer} ${isMenuFixed ? classes.fixed : ''}`} >
          <p className={classes.menuTitle}>MENU</p>
          {
            sectionArrayy.map((item, i) => (
              <a href={`#${item.id}`} className={activeSection === `${item.id}` ? classes.categoryActive : classes.category} key={i}>{item.title}</a>
            ))
          }
        </div>

        <div className={classes.sectionContainer}>
          {
            sectionArrayy.map((item, i) => (
              <div id={item.id} key={i} >
                <ProductSection items={item} />
              </div>
            ))
          }
        </div>

        {/* MAP EACH SECTION: EACH SECTION SHOULD BE A COMPONENT CALLED 'MenuSection' WITHIN COMPONENTS FOLDER
        THE COMPONENT SHOULD TAKE IN SECTION TILE, AND THE LIST OF ITEMS IN THAT SECTION

        EACH SECTION COMPONENT SHOULD MAP THE LIST OF ITEMS 
        EACH ITEM INSIDE THE MAP SHOULD BE A COMPONENT CALLED 'Item' 
        THAT TAKES IN THE PRODUCT INFORMATION AND DISPLAYS IT

        ON CLICK FOR EACH ITEM SHOULD TRIGGER A POP UP MODAL
        THE MODAL IS ALSO A COMPONENT WITHIN THE COMPONENT FOLDER
        IT SHOULD TAKE IN PRODUCT CUSTOMIZATION INFORMATION AND DISPLAY IT ON THE MODAL */}


      </div>
    </div>
  )
}

export default Home