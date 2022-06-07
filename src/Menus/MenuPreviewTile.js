// CSS
import styles from './MenuPreviewTile.module.css';

const MenuPreviewTile = ({ item }) => {
  console.log('tile');
  return (
    <div className={styles.tile}>
      <h2 className={styles.restaurantZHTW}>{item?.restaurant?.zhtw}</h2>
      <h3 className={styles.restaurantPinyin}>{item?.restaurant?.pinyin}</h3>
      <h3 className={styles.restaurantEN}>{item?.restaurant?.en}</h3>
    </div>
  );
};
export default MenuPreviewTile;
