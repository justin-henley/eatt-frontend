import { Outlet } from 'react-router-dom';

function Dishes() {
  return (
    <div>
      <h1>The Dishes component</h1>
      <Outlet />
    </div>
  );
}

export default Dishes;
