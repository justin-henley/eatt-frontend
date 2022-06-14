// Outside components
import { Link } from 'react-router-dom';
// Custom components
import MenuName from './MenuName';

const MenuDisplay = ({ menus }) => {
  return (
    <div>
      {menus?.map((menu) => (
        <Link to={`/menus/${menu._id}`}>
          <MenuName key={menu._id} item={menu} />
        </Link>
      ))}
    </div>
  );
};

export default MenuDisplay;
