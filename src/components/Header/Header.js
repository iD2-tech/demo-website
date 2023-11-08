import React, { useEffect, useState, useRef } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiFillShopping } from "react-icons/ai";
import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import globalInfo from '../../assets/data.json';

const Header = () => { 

    const RESTNAME = globalInfo.RESTNAME;
    const navigation = useNavigate();
    const [cartQuantity, setCartQuantity] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const displayMenuRef = useRef(null);

    const scrollToMenuSection = () => {
        if (displayMenuRef.current) {
            displayMenuRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const storedData = localStorage.getItem("cart");
        const cartJSON = JSON.parse(storedData) || [];
        var totalQuantity = 0;
        cartJSON.forEach(element => {
            totalQuantity += element.quantity;
        });
        console.log("\ttotal quantity displayed in header: " + totalQuantity);
        setCartQuantity(totalQuantity);
    }, []);

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
                    {RESTNAME}
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
                            <Link to="/displayMenu" onClick={scrollToMenuSection}>
                                VIEW MENU & ORDER
                            </Link>
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
