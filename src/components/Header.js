import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { TbShoppingBag } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import kuLogo from '../pages/images/KuLogo.png';
import kuText from '../pages/images/KuText.png';


import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const RESTNAME = "Sushi and Izakaya";

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
            if (cartJSON != null) {
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
            <div className={classes.logo}>
                <Link to="/" className={classes.header__content__logo}>
                <style>
                @import url('https://fonts.googleapis.com/css2?family=El+Messiri&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Darumadrop+One&display=swap');
                </style>
                    <h1 style={{ fontSize: "2rem", marginTop: "4.5%", marginBottom: "0.5%" }}>
                        {/* <img src={kuLogo} style={{height: "90%", marginTop: "1.5%" }} />
                        <img src={kuText} style={{ height: "70%", marginBottom: "4%"}} /> */}
                        <span className={classes.topText}>COMMUNITY</span>
                        <br />
                        <span className={classes.botText}>GROCERY & TERIYAKI</span>
                    </h1>
                </Link>
            </div>

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
                        <FaShoppingBasket size="1.75em" color="white" />
                        <span className={classes.cartQuantity}>
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