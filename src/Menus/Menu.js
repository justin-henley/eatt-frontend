// Outside components
import { useState, useEffect } from 'react';
// import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// Custom Components
import MenuPreviewTile from './MenuPreviewTile';
import DishTile from '../Dishes/DishTile';
import NotFound from '../NotFound';
// CSS
import styles from './Menu.module.css';

function Menu() {
  // Access the params to get the menu ID to display
  let params = useParams();

  // Use state to store the menu returned
  const [data, setData] = useState();

  // Retrieve the menu entry by id
  // TODO what if no menu found?
  const getData = async () => {
    try {
      const result = await fetch(
        `https://menu-translation-backend.herokuapp.com/menus/${params.menuId}`,
        {
          method: 'GET',
        }
      );

      const json = await result.json();

      setData(json);
    } catch (error) {
      console.log('Fetch failed in Menu.js');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // If a menu is not found, a 'message' is returned
  // If no data is available yet, show placeholders
  // TODO the placeholder doesn't change size or animate when told
  // TODO Forward the restaurant info through the Link state if coming from search of all menus
  return !data ? (
    <p>Loading...{/* <Placeholder xs={6} bg="secondary" /> */}</p>
  ) : data?.message ? (
    <NotFound />
  ) : (
    <div>
      <h1 className={styles.restaurant}>Restaurant</h1>
      <MenuPreviewTile item={data} />
      <div>
        <h1 className={styles.menu}>Menu</h1>
        {data?.menu?.map((category) => (
          <div key={category._id} className={styles.category}>
            <div className={styles.categoryName}>
              <h3 className={styles.categoryName__zhtw}>{category.zhtw}</h3>
              <h3 className={styles.categoryName__pinyin}>{category.pinyin}</h3>
              <h3 className={styles.categoryName__en}>{category.en}</h3>
            </div>
            <div className={styles.dishArea}>
              {category.items?.map((item) => (
                <DishTile key={item._id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
