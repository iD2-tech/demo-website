import React, { useEffect, useState } from 'react'
import classes from './Home.module.scss';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import data from '../../assets/data.json';
import ProductSection from '../../components/ProductSection/ProductSection';
import image from '../../assets/images/menuImage.png';

const sectionArray = [
  {
    title: "Stir Fry Vegetable",
    items: [
      {
        title: 'Checken Veggie',
        price: 13.99,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
      {
        title: 'Tofu Veggie',
        price: 13.99,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
      {
        title: 'Pork Veggie',
        price: 14.49,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
      {
        title: 'Shrimp Veggie',
        price: 14.99,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
  
      {
        title: 'Vegetables',
        price: 13.29,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
  
    ]
  },

  {
    title: "Yakisoba",
    items: [
      {
        title: 'Checken Veggie',
        price: 13.99,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
      {
        title: 'Tofu Veggie',
        price: 13.99,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
      {
        title: 'Pork Veggie',
        price: 14.49,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
      {
        title: 'Shrimp Veggie',
        price: 14.99,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
  
      {
        title: 'Vegetables',
        price: 13.29,
        img: image,
        description: '[Description of menu]',
        customization: {
          substitutions: [
            'Fried Rice',
            'Brown Rice',
            'Spicy',
            'Teriyaki Sauce'
          ],
          extras: [
            'Extra Chicken',
            'Extra Katsu'
          ]
        }
      },
  
    ]
  }

]


const Home = () => {

  const nav = useNavigate();
  useEffect(() => {
    window.dispatchEvent(new Event('storage')) // trigger update to header
    console.log(data.categories)
  }, [])

  const goOrder = () => {
    nav("/order");
  }

  const [scrollPercentage, setScrollPercentage] = useState(0.0);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight * (3.0 / 7.0);

      const newScrollPercentage = (scrollY / (pageHeight - windowHeight)) * 100;

      setScrollPercentage(newScrollPercentage);
      console.log(scrollPercentage);

      if (scrollPercentage > 123.42324815124046 && !isMenuFixed) {
        setIsMenuFixed(true);
      } else if (scrollPercentage <= 123.42324815124046 && isMenuFixed) {
        setIsMenuFixed(false);
      }

      const sections = ['whatIsContainer', 'ourVisionContainer', 'keyFeaturesContainer', 'visitContainer'];
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

      const whatIsContainer = document.getElementById('whatIsContainer');
      if (whatIsContainer) {
        const rect = whatIsContainer.getBoundingClientRect();
        if (rect.top > windowHeight * 0.5) {
          setActiveSection(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPercentage]);

  useEffect(() => {
    const menuItems = document.querySelectorAll('[data-target]');

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', () => {
        const targetId = menuItem.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });

    return () => {
      menuItems.forEach((menuItem) => {
        menuItem.removeEventListener('click', () => { });
      });
    };
  }, []);

  return (

    <div className={classes.container}>
      <div className={classes.introSlide}>

        {/* THIS SHOULD BE A BUTTON COMPONENT INSIDE COMPONENTS FOLDER
        SHOULD BE CENTERED ON THE PAGE.
        COMPONENT SHOULD BE ABLE TO TAKE IN A 'TEXT' PROP  */}
        <button onClick={goOrder} className={classes.button}>
          ORDER NOW
          <AiOutlineArrowRight style={{ marginLeft: '15px' }} />
        </button>

      </div>

      <div className={classes.orderContainer}>

        {/* THIS SHOULD BE A 'SIDEBAR SCROLL' COMPONENT WITHIN COMPONENT FOLDER */}
        <div className={classes.menuContainer}>
          <text className={classes.menuTitle}>MENU</text>
          {data.categories.map((category) => (
             <text className={classes.category}>{category}</text>
          ))}
        </div>
        <div className={classes.sectionContain}>
          {
            sectionArray.map((item, i) => {
              return (
                <ProductSection items={item}/>
              )
            })
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