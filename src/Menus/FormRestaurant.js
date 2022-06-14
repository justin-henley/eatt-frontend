function FormRestaurant({ handleSubmit, handleChange, restaurant }) {
  return (
    <form action="post" onSubmit={handleSubmit} /* className={styles.form} */>
      <h1>Please carefully create a new menu</h1>
      <fieldset>
        <legend>Restaurant</legend>
        <label>
          Traditional Chinese:
          <input type="text" name="zhtw" required value={restaurant.zhtw || ''} onChange={handleChange} />
        </label>
        <label>
          Hanyu Pinyin:
          <input type="text" name="pinyin" required value={restaurant.pinyin || ''} onChange={handleChange} />
        </label>
        <label>
          English:
          <input type="text" name="en" required value={restaurant.en || ''} onChange={handleChange} />
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormRestaurant;
