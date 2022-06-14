// Outside components

// Custom Components
import DishTile from '../Dishes/DishTile';

// CSS
import styles from './MenuContent.module.css';

function MenuContent({ menu }) {
  return (
    <div>
      <h1 className={styles.menu}>Menu</h1>
      {menu?.map((category) => (
        <div key={category._id} className={styles.category}>
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
      ))}
    </div>
  );
}

export default MenuContent;
