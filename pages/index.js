// Libraries
import Image from 'next/image';
// Custom Components
import DishTile from '../components/Dish/DishTile';
// CSS
import styles from '../styles/Home.module.css';
// Images
import bannerGuabao from '../public/img/pexels-adrian-dorobantu-2089712.jpg';
/* import bannerMilkTea from '../public/img/taiwan-pearl-milk-tea-with-bubble-ximending-taipei-taiwan.jpg'; */

export default function Home() {
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
  // Keep an eye out for further image/delivery optimization for further speed gains
  return (
    <div>
      <div className={styles.block}>
        <h1 className={styles.slogan}>
          <span className={styles.sloganFlash}>Eat</span> your heart out
        </h1>
        <div className={styles.imageWrapper}>
          <Image
            alt="Gua Bao"
            src={bannerGuabao}
            placeholder="blur"
            width={625}
            height={500}
            layout="responsive"
            className={styles.image}
            priority="true"
          />
        </div>
        <div className={styles.dish}>
          <DishTile item={eatTile} className={styles.food} />{' '}
        </div>
      </div>
      {/* {
        <div className={styles.block}>
          <h1 className={styles.slogan}>
            <span className={styles.sloganFlash}>Drink</span> and be merry.
          </h1>
          <div className={styles.imageWrapper}>
            <Image alt="Bubble Milk Tea" src={bannerMilkTea} placeholder="blur" layout="responsive" priority className={styles.image} />
          </div>
          <div className={styles.dish}>
            <DishTile item={drinkTile} />{' '}
          </div>
        </div>
      } */}
    </div>
  );
}
