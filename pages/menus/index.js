// Libraries
import { useState, useEffect } from 'react';
// Custom components
import MenuDisplay from '../../components/Menus/MenuDisplay';

export default function AllMenus() {
  // Menu data is set in state and updated upon fetching
  const [data, setData] = useState();

  const getData = async () => {
    const result = await fetch('https://menu-translation-backend.herokuapp.com/menus', {
      method: 'GET',
    });

    const json = await result.json();

    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>All Menus</h1>
      <MenuDisplay menus={data} />
    </div>
  );
}
