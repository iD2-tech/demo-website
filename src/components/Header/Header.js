import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose, AiFillShopping } from "react-icons/ai";
import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => { 

    // need global variable for restaurant name. Will be prop from JSON
    const RESTNAME = "COMMUNITY GROCERY AND DELI";
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const navigation = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });
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
        if (menuIsOpen) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
      }, [menuIsOpen]);
    
      const menuToggleHandler = () => {
        setMenuIsOpen(!menuIsOpen);
      };

    const ctaClickHandler = () => {
        menuToggleHandler();
        navigation("/cart");
    };

    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <Link to="/" className={classes.header__content__logo}>
                    {RESTNAME}
                </Link>
                <nav className={classes.header__content__nav}>
                    <ul>
                        <li>
                            <Link to="/aboutus" onClick={menuToggleHandler}>
                                ABOUT US
                            </Link>
                        </li>
                        <li>
                            {/* the link to menu will also be stored within json */}
                            <Link to="/visitus" onClick={menuToggleHandler}>
                                VISIT US
                            </Link>
                        </li>
                        <li>
                            <Link to="/order" onClick={menuToggleHandler}>
                                VIEW MENU & ORDER
                            </Link>
                        </li>
                    </ul>
                    <button onClick={ctaClickHandler}>
                        <AiFillShopping size="2em" />
                        <span>
                            {cartQuantity}
                        </span>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;