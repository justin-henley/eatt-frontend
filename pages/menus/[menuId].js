// Libraries
import { useState, useEffect } from 'react';
// import Placeholder from 'react-bootstrap/Placeholder';
import { useRouter } from 'next/router';
// Custom Components
import MenuName from '../../components/Menus/MenuName';
import MenuContent from '../../components/Menus/MenuContent';
import NotFound from '../404';
// CSS
import styles from '../../styles/Menu.module.css';

function Menu() {
  // Access the params to get the menu ID to display
  const router = useRouter();
  const { menuId } = router.query;

  // Use state to store the menu returned
  const [data, setData] = useState();

  // Retrieve the menu entry by id
  const getData = async () => {
    try {
      let result;
      if (menuId) {
        result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus/${menuId}`, {
          method: 'GET',
        });

        const json = await result.json();

        setData(json);
      }
    } catch (error) {
      setData({ message: 'This menu does not exist.' });
    }
  };

  // Only get data once the menuId is available
  useEffect(() => {
    getData();
  }, [menuId]);

  // If a menu is not found, a 'message' is returned
  // If no data is available yet, show placeholders
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
