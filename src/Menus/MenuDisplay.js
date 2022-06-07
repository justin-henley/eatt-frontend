import { Link } from 'react-router-dom';
import MenuPreviewTile from './MenuPreviewTile';

const MenuDisplay = ({ menus }) => {
  return (
    <div>
      {menus?.map((menu) => (
        <>
          {' '}
          <Link to={`/menus/${menu._id}`}>
            <MenuPreviewTile key={menu._id} item={menu} />
          </Link>
        </>
      ))}
    </div>
  );
};

export default MenuDisplay;