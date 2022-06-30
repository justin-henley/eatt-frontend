// Libraries
import { useState, useEffect } from 'react';
// import Placeholder from 'react-bootstrap/Placeholder';
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
  const getData = async () => {
    try {
      const result = await fetch(`https://menu-translation-backend.herokuapp.com/menus/${params.menuId}`, {
        method: 'GET',
      });

      const json = await result.json();

      setData(json);
    } catch (error) {
      setData({ message: 'This menu does not exist.' });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // If a menu is not found, a 'message' is returned
  // If no data is available yet, show placeholders
  // TODO the placeholder doesn't change size or animate when told
  return !data ? (
    <p>Loading...{/* <Placeholder xs={6} bg="secondary" /> */}</p>
  ) : data?.message ? (
    <NotFound message={data.message} />
  ) : (
    <div>
      <h1 className={styles.restaurant}>Restaurant</h1>
      <MenuName restaurant={data.restaurant} />
      <MenuContent menu={data.menu} />
    </div>
  );
}

export default Menu;
