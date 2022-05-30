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
        <img
          alt="Gua Bao"
          src="./img/pexels-adrian-dorobantu-2089712.jpg"
          height="auto"
        />
        <div>
          <p className={styles.call}>EAT</p>
          <p className={styles.response}>your heart out</p>
          <Dish item={eatTile} />
        </div>
      </div>
      <div className={styles.block2}>
        <img
          src="./img/taiwan-pearl-milk-tea-with-bubble-ximending-taipei-taiwan.jpg"
          alt="Milk Tea"
          height="auto"
        />
        <div>
          <p className={styles.call}>DRINK</p>
          <p className={styles.response}>and be merry.</p>
          <Dish item={drinkTile} />
        </div>
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
