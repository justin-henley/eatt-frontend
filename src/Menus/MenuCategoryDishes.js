function MenuCategoryDishes({ items, categoryId, handleRemoveItem }) {
  const itemSeparator = ' - ';

  return (
    <ul hidden={false}>
      {items &&
        items.map((item) => (
          <li key={categoryId + item.id}>
            <span>
              {item.zhtw}
              {itemSeparator}
              {item.pinyin}
              {itemSeparator}
              {item.en}
            </span>

            <button type="button" data-category-id={categoryId} data-dish-id={item.id} onClick={handleRemoveItem}>
              -
            </button>
          </li>
        ))}
    </ul>
  );
}

export default MenuCategoryDishes;
