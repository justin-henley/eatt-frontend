function FormCategory({ handleSubmit, handleChange, category }) {
  return (
    <form action="post" onSubmit={handleSubmit} /* className={styles.form} */>
      <h1>Please carefully create a new menu</h1>
      <fieldset>
        <legend>Category</legend>
        <label>
          Traditional Chinese:
          <input type="text" name="zhtw" required value={category.zhtw || ''} onChange={handleChange} />
        </label>
        <label>
          Hanyu Pinyin:
          <input type="text" name="pinyin" required value={category.pinyin || ''} onChange={handleChange} />
        </label>
        <label>
          English:
          <input type="text" name="en" required value={category.en || ''} onChange={handleChange} />
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormCategory;
