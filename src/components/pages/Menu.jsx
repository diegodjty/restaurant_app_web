import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import Dish from '../ui/Dish';

const Menu = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      const dishesSnapshot = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDishes(dishesSnapshot);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/new-dish"
        className="bg-blue-800 inline-block mb5
       p-2 text-white uppercase font-bold "
      >
        New Dish
      </Link>
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default Menu;
