import DishTile from './Dishes/DishTile';
// import styled from 'styled-components';
import styles from './Welcome.module.css';

const Welcome = () => {
  // A demo dish to label the parts for new users
  const eatTile = {
    meat: 'pork',
    zhtw: '刈包',
    pinyin: 'guàbāo',
    en: 'Pork Belly Bun',
  };

  /* const drinkTile = {
    category: 'drink',
    zhtw: '珍珠奶茶',
    pinyin: 'zhēnzhū nǎichá',
    en: 'Bubble Milk Tea',
  }; */

  // The welcome page
  return (
    <div>
      <div className={styles.block1}>
        <h1 className={styles.shout}>
          <span className={styles.flash}>Eat</span> your heart out
        </h1>
        <img
          alt="Gua Bao"
          src="./img/pexels-adrian-dorobantu-2089712.jpg"
          height="auto"
        />
        <div className={styles.dish}>
          <DishTile item={eatTile} className={styles.food} />{' '}
        </div>
      </div>
      {/* <div className={styles.block2}>
        <h1 className={styles.shout}>
          <span className={styles.flash}>Drink</span> and be merry.
        </h1>

        <img
          src="./img/taiwan-pearl-milk-tea-with-bubble-ximending-taipei-taiwan.jpg"
          alt="Milk Tea"
          height="auto"
        />
        <div className={styles.dish}>
          <Dish item={drinkTile} />{' '}
        </div>
      </div> */}
    </div>
  );
};

export default Welcome;
