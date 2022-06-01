// CSS
import styles from './MenuPreviewTile.module.css';

const MenuPreviewTile = ({ item }) => {
  console.log('tile');
  return (
    <div className={styles.tile}>
      <h1 className={styles.chinese}>{item.restaurant.zhtw}</h1>
      <div className={styles.translation}>
        <h2 className={styles.pinyin}>{item.restaurant.pinyin}</h2>
        <h3 className={styles.english}>{item.restaurant.en}</h3>
      </div>
    </div>
  );
};
export default MenuPreviewTile;
