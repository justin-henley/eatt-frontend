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
      {showRestaurantForm ? (
        <MenuNewRestaurantForm restaurant={restaurant} handleChange={handleChange} />
      ) : (
        <MenuName restaurant={restaurant} />
      )}
      <button type="button" onClick={handleClick}>
        {showRestaurantForm ? 'Save' : 'Edit'}
      </button>
      <hr />
    </div>
  );
}

export default MenuNewRestaurant;
