import styles from './DishTile.module.css'; // Import css modules stylesheet as styles

//import styled from 'styled-components';
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

const Dish = ({ item }) => {
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
};

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

export default Dish;
