import Dish from './Dish';
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

  const drinkTile = {
    category: 'drink',
    zhtw: '珍珠奶茶',
    pinyin: 'zhēnzhū nǎichá',
    en: 'Bubble Milk Tea',
  };

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
        <Dish item={eatTile} />
      </div>
      <div className={styles.block2}>
        <h1 className={styles.shout}>
          <span className={styles.flash}>Drink</span> and be merry.
        </h1>

        <img
          src="./img/taiwan-pearl-milk-tea-with-bubble-ximending-taipei-taiwan.jpg"
          alt="Milk Tea"
          height="auto"
        />
        <Dish item={drinkTile} />
      </div>
      {/* <h1>Welcome to the Menu Translation website!</h1>
      <p>
        This website is the interactive front-end for the Menu Translation
        database, a repository of Taiwanese dishes with their English names.
      </p>

      <Dish item={demoDish} /> */}
    </div>
  );
};

export default Welcome;
