// Custom Components
import DishDisplay from '../Dishes/DishDisplay';
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
      <DishDisplay dishes={category?.items} />
    </div>
  );
}

export default MenuCategory;
