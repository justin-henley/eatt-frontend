// CSS
import styles from '../../styles/DishTile.module.css';
// Icons
import { SiHappycow } from 'react-icons/si';
import {
  GiPig,
  GiChicken,
  GiBroccoli,
  GiCoffeeCup,
  GiBowlOfRice,
  GiBubblingBowl,
  GiNoodles,
  GiRawEgg,
} from 'react-icons/gi';
import { FaFish, FaBreadSlice, FaQuestionCircle } from 'react-icons/fa';

/**
 * Displays a single dish in a formatted tile view
 * @requires react-icons
 * @param {Object} item - The data of the dish to be displayed
 */
export default function DishTile({ item }) {
  // Select the meat and category icons for this dish
  const meatIcon = icons.meat[item.meat];
  const categoryIcon = icons.category[item.category];

  return (
    <div className={styles.tile}>
      <div className={styles.icons}>
        {meatIcon}
        {categoryIcon}
      </div>
      <div className={styles.text}>
        <h1 className={styles.chinese}>{item.zhtw}</h1>
        <div className={styles.translation}>
          <h2 className={styles.pinyin}>{item.pinyin}</h2>
          <h3 className={styles.english}>{item.en}</h3>
        </div>
      </div>
    </div>
  );
}

// Lists of meat and category icons
const icons = {
  meat: {
    beef: <SiHappycow />,
    pork: <GiPig />,
    bird: <GiChicken />,
    fish: <FaFish />,
    veg: <GiBroccoli />,
    egg: <GiRawEgg />,
    other: <FaQuestionCircle />,
    unknown: <FaQuestionCircle />,
    none: null,
  },
  category: {
    rice: <GiBowlOfRice />,
    noodle: <GiNoodles />,
    bread: <FaBreadSlice />,
    soup: <GiBubblingBowl />,
    drink: <GiCoffeeCup />,
    other: <FaQuestionCircle />,
    unknown: <FaQuestionCircle />,
  },
};
