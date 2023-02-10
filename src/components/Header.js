import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose, AiFillShopping } from "react-icons/ai";


import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const RESTNAME = "Wonderful Pho";

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
            for (var key in cartJSON) {
                totalQuantity += cartJSON[key];
            }
            console.log("\ttotal quantity displayed in header: " + totalQuantity);
            setCartQuantity(totalQuantity);
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, [localStorage.getItem("cart")]);

    // useEffect(() => {
    //     const handleStorage = () => {
    //         // Place for a function responsible for
    //         // pulling and displaying local storage data
            // var cartJSON = localStorage.getItem("cart");
            // cartJSON = JSON.parse(cartJSON);
            // var totalQuantity = 0;
            // for (var key in cartJSON) {
            //     totalQuantity += cartJSON[key];
            // }
            // console.log("hi" + totalQuantity);
            // setCartQuantity(totalQuantity);
    //     }

    //     window.addEventListener('storage', handleStorage())



    // }, [])

    useEffect(() => {


        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
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
                <nav
                    className={`${classes.header__content__nav} ${menuOpen && size.width < 768 ? classes.isMenu : ""
                        }`}
                >
                    <ul>
                        <li>
                            <a href={require("./phomenu.pdf")} target="_blank" onClick={menuToggleHandler}>
                                Menu
                            </a>
                        </li>
                        <li>
                            <Link to="/order" onClick={menuToggleHandler}>
                                Order
                            </Link>
                        </li>
                        <li>
                            <Link to="/aboutus" onClick={menuToggleHandler}>
                                About Us
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
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;