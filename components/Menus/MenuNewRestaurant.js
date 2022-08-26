// Custom Components
import MenuNewRestaurantForm from './MenuNewRestaurantForm';
import MenuName from './MenuName';

/**
 * The form section for modifying and displaying the restaurant name in a parent menu form
 * @requires MenuNewRestaurantForm
 * @requires MenuName
 * @param {Boolean} showRestaurantForm - Boolean state variable deciding whether to display form or name tile
 * @param {Function} setShowRestaurantForm - State variable setter for showRestaurantForm
 * @param {Object} restaurant - The restaurant names for the current menu
 * @param {Function} handleChange - Handler for changes to the text fields setting the restaurant names
 */
export default function MenuNewRestaurant({ showRestaurantForm, setShowRestaurantForm, restaurant, handleChange }) {
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
      <button type="button" onClick={handleClick} style={{ margin: '0.5em 0' }}>
        {showRestaurantForm ? 'Save' : 'Edit'}
      </button>
      <hr />
    </div>
  );
}
