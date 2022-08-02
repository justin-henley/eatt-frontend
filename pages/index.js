// Libraries
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
// Custom Components
import DishTile from '../components/Dish/DishTile';
// CSS
import styles from '../styles/Home.module.css';
// Images
import bannerGuabao from '../public/img/guabao.jpg';
import bannerMilkTea from '../public/img/tea.jpg';

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
    <div className={styles.wrapper}>
      <Carousel>
        <Carousel.Item>
          <div className={styles.block}>
            <h1 className={styles.slogan}>
              <span className={styles.sloganFlash}>Eat</span> your heart out
            </h1>
            <div className={styles.imageWrapper}>
              <Image
                alt="Gua Bao"
                src={bannerGuabao}
                placeholder="blur"
                width={800}
                height={529}
                layout="responsive"
                className={styles.image}
                priority="true"
              />
            </div>
            <div className={styles.dish}>
              <DishTile item={eatTile} className={styles.food} />{' '}
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.block}>
            <h1 className={styles.slogan}>
              <span className={styles.sloganFlash}>Drink</span> and be merry.
            </h1>
            <div className={styles.imageWrapper}>
              <Image
                alt="Bubble Milk Tea"
                src={bannerMilkTea}
                placeholder="blur"
                layout="responsive"
                width={800}
                height={529}
                priority
                className={styles.image}
              />
            </div>
            <div className={styles.dish}>
              <DishTile item={drinkTile} />{' '}
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <h1>Wanna try something new?</h1>
      <p>
        We've all been there. You walk past a shop with a line out the door, and you take a peek at the menu on the
        wall.
      </p>
      <h3>Bah. All text.</h3>
      <p>
        None of the dishes you've learned, and no pictures or translations in sight. Do you brave it, pointing and
        gesturing towards other people's meals? Or do you eat at the convenience store again in defeat?
      </p>
      <h3>I wish I could read Chinese...</h3>
      <p>
        You should learn! But its a long road from here to fluency, and your stomach hasn't got that kind of time. Let
        those further on that road give you a hand along the way with Eatt.
      </p>
      <h1>Already comfortable with Chinese?</h1>
      <p>
        Have a look around, find something new, and pass it forward! Contribute a missing dish or new menu, and
        recommend Eatt to a hungry-looking friend.
      </p>
    </div>
  );
}
