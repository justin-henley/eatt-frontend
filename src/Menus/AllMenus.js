import { useState, useEffect } from 'react';
import MenuDisplay from './MenuDisplay';

function AllMenus() {
  const [data, setData] = useState();

  const getData = async () => {
    const result = await fetch(
      'https://menu-translation-backend.herokuapp.com/menus',
      {
        method: 'GET',
      }
    );

    const json = await result.json();

    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>AllMenus Component</h1>
      <MenuDisplay menus={data} />
    </div>
  );
}

export default AllMenus;
