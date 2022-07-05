// Libraries
import Image from 'next/image';
// Custom Components
import DishTile from '../components/Dish/DishTile';
// CSS
import styles from '../styles/Home.module.css';
// Images
import bannerPic from '../public/img/pexels-adrian-dorobantu-2089712.jpg';

// TODO At larger viewports the image gets thrown outside the page width
export default function Home() {
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
        <Image alt="Gua Bao" src={bannerPic} className={styles.image}></Image>
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
}
