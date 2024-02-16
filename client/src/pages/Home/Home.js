import React, { useEffect, useState, useRef } from 'react'
import classes from './Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import data from '../../assets/data.json';
import ProductSection from '../../components/ProductSection/ProductSection';
import image from '../../assets/images/menuImage.png';
import { useContext } from 'react';
import { FirebaseContext } from '../../firebaseContext';
import { ref, onValue } from 'firebase/database';

const Home = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0.0);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const [sectionArrayy, setSectionArray] = useState([]);
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const divRef = useRef(null);
  const database = useContext(FirebaseContext);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://community-teriyaki-backend.onrender.com:7071/ws');
    console.log(ws)
    ws.onmessage = (event) => {
      // Check if the message indicates a product update

      const message = JSON.parse(event.data);
      if (message.type === 'product_updated') {
        // Refetch products and prices
        getProducts();
        getPrices();
      }
    };
  
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Reference to the "restaurants" node in the database
    const restaurantsRef = ref(database, 'restaurants');

    // Attach an asynchronous callback to read the data at the reference
    onValue(restaurantsRef, (snapshot) => {
      const data = snapshot.val();
      setRestaurantData(data);
    });

    // Detach the callback when the component unmounts
    return () => {
      // Unsubscribe from the database changes
      // This helps avoid potential memory leaks
      // when the component is unmounted
      onValue(restaurantsRef, () => { });
    };
  }, [database]); // Only re-run the effect if the database changes


  // retrieve products and prices
  useEffect(() => {
    window.dispatchEvent(new Event('storage')) // trigger update to header
    if (products.length == 0 || prices.length == 0) {
      getProducts();
      getPrices();
    } else {
      combinePrices();
    }
  }, [products])

  // get all products from stripe
  const getProducts = async () => {
    fetch('https://community-teriyaki-backend.onrender.com/products')
      .then(r => r.json())
      .then(data => {
        var array = data.products;
        setProducts(array);
      });
      // fetch('http://localhost:3000/products')
      // .then(r => r.json())
      // .then(data => {
      //   var array = data.products;
      //   setProducts(array);
      // });
  }

  // get all prices from stripe
  const getPrices = async () => {
    fetch('https://community-teriyaki-backend.onrender.com/prices', {
    }).then(r => r.json())
      .then(data => {
        var array = data.price;
        setPrices(array);
      })
    //   fetch('http://localhost:3000/prices', {
    // }).then(r => r.json())
    //   .then(data => {
    //     var array = data.price;
    //     setPrices(array);
    //   })
  }

  // combines products to prices
  const combinePrices = () => {

    // create section array
    const sectionArray = [];
    for (let i = 0; i < data.categories.length; i++) {
      sectionArray.push({ title: data.categories[i].title, id: data.categories[i].id, items: [], customization: [] });
    }

    // edit prices
    // put each item into its respective category in the section array
    for (let i = 0; i < products.length; i++) {
      products[i].price = prices[i].unit_amount / 100;

      if (products[i].metadata.customization === 'true') {
        const catNames = products[i].metadata.category.split(', ');
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
    setSectionArray(sectionArray);
  }


  // handles sidebar menu UI
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
            const menuContainer = document.getElementById('menuContainer');
            if (menuContainer) {
              const activeCategory = menuContainer.querySelector(`[href="#${sectionId}"]`);
              if (activeCategory) {
                activeCategory.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                });
              }
            }
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

  const scrollToOrderContainer = () => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (

    <div className={`${classes.container} ${classes.bleedContent}`}>
      <div
        className={classes.introSlide}
        style={{
          backgroundImage: `url(${restaurantData &&
            Object.entries(restaurantData).map(([restaurantId, restaurant]) => (
              restaurant.backgroundImage
            ))
            })`,
        }}
      ></div>

      <div className={classes.orderContainer} ref={divRef}>
        <div id={'menuContainer'} className={`${classes.menuContainer} ${isMenuFixed ? classes.fixed : ''}`} >
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
      </div>
    </div>
  )
}

export default Home