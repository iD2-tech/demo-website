import classes from "./Header.module.scss";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiFillShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const HeaderLinks = () => {
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const [cartQuantity, setCartQuantity] = useState();
    const [data, setData] = useState(null);
    
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
    
    return(
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
                            <Link to="/displayMenu" onClick={() => {
                                menuToggleHandler();
                                scrollToMenuSection();
                            }}>
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
    )
}

export default HeaderLinks;