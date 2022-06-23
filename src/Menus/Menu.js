// Outside components
import { useState, useEffect } from 'react';
// import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// Custom Components
import MenuName from './MenuName';
import MenuContent from './MenuContent';
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
      const result = await fetch(`https://menu-translation-backend.herokuapp.com/menus/${params.menuId}`, {
        method: 'GET',
      });

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
      <MenuName restaurant={data.restaurant} />
      <MenuContent menu={data.menu} />
    </div>
  );
}

export default Menu;
