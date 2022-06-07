import { Link } from 'react-router-dom';
import MenuPreviewTile from './MenuPreviewTile';

const MenuDisplay = ({ menus }) => {
  return (
    <div>
      <h1>MenuDisplay Component</h1>
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
