// Libraries
import DishTile from './DishTile';
// CSS
import styles from '../../styles/DishDisplay.module.css';

/**
 * Displays all dishes passed to it as DishTiles
 * @requires DishTile
 * @param { [Object] } dishes - An array of dishes to display
 */
export default function DishDisplay({ dishes }) {
  // Map iterates over all dishes and creates a tile for each
  return (
    <div className={styles.display}>
      {dishes?.map((dish) => (
        <DishTile key={dish._id || dish.id} item={dish} />
      ))}
    </div>
  );
}
