// Libraries
import { Link } from 'react-router-dom';
// Custom components
import MenuName from './MenuName';

const MenuDisplay = ({ menus }) => {
  return (
    <div>
      {menus?.map((menu) => (
        <Link to={`/menus/${menu._id}`} key={menu._id}>
          <MenuName restaurant={menu.restaurant} />
        </Link>
      ))}
    </div>
  );
};

export default MenuDisplay;
