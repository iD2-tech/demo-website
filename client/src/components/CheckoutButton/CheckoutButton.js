import React, {useEffect, useState} from 'react';
import classes from './CheckoutButton.module.scss';
import { useContext } from 'react';
import { FirebaseContext } from '../../firebaseContext';
import { ref, onValue } from 'firebase/database';

const CheckoutButton = ({ onClick }) => {
  const database = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reference to the "restaurants" node in the database
    const restaurantsRef = ref(database, 'restaurants/-Nj2D9YEjyq1iyZM6aSQ');

    // Attach an asynchronous callback to read the data at the reference
    onValue(restaurantsRef, (snapshot) => {
      const data = snapshot.val();
      const openn = data.open
      setOpen(openn)
    });

    // Detach the callback when the component unmounts
    return () => {
      // Unsubscribe from the database changes
      // This helps avoid potential memory leaks
      // when the component is unmounted
      onValue(restaurantsRef, () => {});
    };
  }, [database]); 

  
  return (
    <button className={!open ? classes.disabled: classes.checkoutButton} onClick={onClick} disabled={!open}>
      Checkout
    </button>
  );
};

export default CheckoutButton;