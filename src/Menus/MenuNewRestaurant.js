// Outside Components
import { useState } from 'react';
// Custom Components
import MenuNewRestaurantForm from './MenuNewRestaurantForm';
import MenuName from './MenuName';

function MenuNewRestaurant({ showRestaurantForm, setShowRestaurantForm, restaurant, handleChange }) {
  const handleClick = (e) => {
    e.preventDefault();
    setShowRestaurantForm(!showRestaurantForm);
  };

  return (
    <div className="restaurantSection">
      <hr />
      <h2>Restaurant Section</h2>
      {showRestaurantForm ? (
        <MenuNewRestaurantForm restaurant={restaurant} handleChange={handleChange} />
      ) : (
        <MenuName restaurant={restaurant} />
      )}
      <button onClick={handleClick}>{showRestaurantForm ? 'Save' : 'Edit'}</button>
      <hr />
    </div>
  );
}

export default MenuNewRestaurant;
