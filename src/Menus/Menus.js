import { Outlet } from 'react-router-dom';

function Menus() {
  return (
    <div>
      {/* <h1>The Menus component</h1> */}
      <Outlet />
    </div>
  );
}

export default Menus;
