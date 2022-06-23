// Custom Components
import DishTile from '../Dishes/DishTile';
// CSS
import styles from './MenuCategory.module.css';

function MenuCategory({ category }) {
  return (
    <div className={styles.category}>
      <div className={styles.categoryName}>
        <h3 className={styles.categoryName__zhtw}>{category.zhtw}</h3>
        <h3 className={styles.categoryName__pinyin}>{category.pinyin}</h3>
        <h3 className={styles.categoryName__en}>{category.en}</h3>
      </div>
      <div className={styles.dishArea}>
        {category.items?.map((item) => (
          <DishTile key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MenuCategory;
