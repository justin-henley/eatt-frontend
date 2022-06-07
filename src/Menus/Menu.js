import { useState, useEffect } from 'react';
import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DishTile from '../Dishes/DishTile';
import NotFound from '../NotFound';

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
  return !data ? (
    <p>Loading...{/* <Placeholder xs={6} bg="secondary" /> */}</p>
  ) : data?.message ? (
    <NotFound />
  ) : (
    <div>
      <h1>Restaurant</h1>
      <h3>{data?.restaurant?.zhtw}</h3>
      <h3>{data?.restaurant?.pinyin}</h3>
      <h3>{data?.restaurant?.en}</h3>
      <div>
        <h1>Menu</h1>
        {data?.menu?.map((category) => (
          <div key={category._id}>
            <h3>{`${category.zhtw} (${category.pinyin}) - ${category.en}`}</h3>
            {category.items?.map((item) => (
              <DishTile key={item._id} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
