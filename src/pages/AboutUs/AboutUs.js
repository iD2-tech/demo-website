import React, { useEffect, useState } from 'react';
import classes from './AboutUs.module.scss';
import AboutUsInfo from '../../components/AboutUsInfo/AboutUsInfo';
import Information from '../../components/Information/Information';
import { useContext } from 'react';
import { FirebaseContext } from '../../firebaseContext';
import { ref, onValue } from 'firebase/database';

const AboutUs = () => {
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

  return (
    <div className={classes.container}>
      <div className={classes.header}>ABOUT US</div>
      {restaurantData && (
        <div>
          {Object.entries(restaurantData).map(([restaurantId, restaurant]) => (
            <AboutUsInfo
            imageUrl={restaurant.imageUrl}
            headerText={restaurant.headerText}
            bodyText={restaurant.bodyText}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutUs;
