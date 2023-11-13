import React, { useEffect, useState, useRef } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiFillShopping } from "react-icons/ai";
import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { FirebaseContext } from '../../firebaseContext';
import { ref, onValue } from 'firebase/database';

const Header = ({ scrollToOrderContainer }) => { 
    const navigation = useNavigate();
    const [cartQuantity, setCartQuantity] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const database = useContext(FirebaseContext);
    const [restaurantData, setRestaurantData] = useState(null);
  
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
        onValue(restaurantsRef, () => {});
      };
    }, [database]); // Only re-run the effect if the database changes

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const handleCartChange = () => {
          const storedData = localStorage.getItem("cart");
          const cartJSON = JSON.parse(storedData) || [];
          var totalQuantity = 0;
          cartJSON.forEach((element) => {
            totalQuantity += element.quantity;
          });
          console.log("\ttotal quantity displayed in header: " + totalQuantity);
          setCartQuantity(totalQuantity);
        };
    
        window.addEventListener("storage", handleCartChange);
    
        return () => {
          window.removeEventListener("storage", handleCartChange);
        };
      }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuVisible(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const ctaClickHandler = () => {
        navigation("/cart");
    };

    return (
        <header className={`${classes.header} ${menuVisible ? classes.menuVisible : ''}`}>
            <div className={classes.header__content}>
                <Link to="/" className={classes.header__content__logo}>
                {restaurantData && (
                    <div>
                    {Object.entries(restaurantData).map(([restaurantId, restaurant]) => (
                        restaurant.RESTNAME
                    ))}
                    </div>
                )}
                </Link>
                <BiMenuAltRight
                    className={classes.header__content__hamburger}
                    onClick={toggleMenu} 
                />
                <nav
                    className={`${classes.header__content__nav} ${menuVisible ? classes.menuVisible : ''}`}
                >
                    <ul>
                        <li>
                            <Link to="/aboutus">
                                ABOUT US
                            </Link>
                        </li>
                        <li>
                            <Link to="/visitus">
                                VISIT US
                            </Link>
                        </li>
                        <li>
                            <div onClick={scrollToOrderContainer}>
                                VIEW MENU & ORDER
                            </div>
                        </li>
                        <button onClick={ctaClickHandler}>
                            <AiFillShopping size="2em" />
                            <span>
                                {cartQuantity}
                            </span>
                        </button>
                    </ul>
                </nav>
            </div>
        </header>
    );    
};

export default Header;
