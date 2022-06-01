import MenuPreviewTile from './MenuPreviewTile';

const MenuDisplay = ({ menus }) => {
  return (
    <div>
      <h1>MenuDisplay Component</h1>
      {menus?.map((menu) => (
        <MenuPreviewTile key={menu._id} item={menu} />
      ))}
    </div>
  );
};

export default MenuDisplay;
