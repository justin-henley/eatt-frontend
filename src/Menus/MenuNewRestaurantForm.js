function MenuNewRestaurantForm({ restaurant, handleChange }) {
  return (
    <fieldset>
      <legend>Restaurant</legend>
      <label>
        Traditional Chinese:
        <input type="text" name="zhtw" required value={restaurant?.zhtw || ''} onChange={handleChange} />
      </label>
      <label>
        Hanyu Pinyin:
        <input type="text" name="pinyin" required value={restaurant?.pinyin || ''} onChange={handleChange} />
      </label>
      <label>
        English:
        <input type="text" name="en" required value={restaurant?.en || ''} onChange={handleChange} />
      </label>
    </fieldset>
  );
}

export default MenuNewRestaurantForm;
