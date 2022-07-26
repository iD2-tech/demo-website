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
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""
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