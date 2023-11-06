import React, { useEffect, useState, useRef } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose, AiFillShopping } from "react-icons/ai";
import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import HeaderLinks from "./HeaderLinks.js";

const Header = () => { 

    // need global variable for restaurant name. Will be prop from JSON
    const RESTNAME = "COMMUNITY GROCERY AND DELI";
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const [cartQuantity, setCartQuantity] = useState();
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("cart");
        setData(JSON.parse(storedData));

        const handleStorage = (event) => {
            if (event.key === "cart") {
                setData(JSON.parse(event.newValue));
              }
            var cartJSON = localStorage.getItem("cart");
            cartJSON = JSON.parse(cartJSON);
            var totalQuantity = 0;
            if(cartJSON != null) {
                cartJSON.forEach(element => {
                    totalQuantity += element.quantity;
                });
            }
            console.log("\ttotal quantity displayed in header: " + totalQuantity);
            setCartQuantity(totalQuantity);
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, [localStorage.getItem("cart")]);

    useEffect(() => {
        if (open) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
      }, [open]);
    
      const menuToggleHandler = () => {
        setOpen(!open);
      };

    const ctaClickHandler = () => {
        menuToggleHandler();
        navigation("/cart");
    };

const displayMenuRef = useRef(null);

  const scrollToMenuSection = () => {
    if (displayMenuRef.current) {
      displayMenuRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

    return (
        <header className={`${classes.header} ${!open && classes['header-closed']}`}>
            <div className={classes.header__content}>
                <Link to="/" className={classes.header__content__logo}>
                    {RESTNAME}
                </Link>
                <BiMenuAltRight className={classes.header__content__hamburger}
                    onClick={() => setOpen(!open)}
                />
                {open && <HeaderLinks/>}
            </div>
        </header>
    );
};

export default Header;