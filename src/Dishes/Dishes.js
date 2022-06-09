// Outside components
import { Outlet } from 'react-router-dom';

function Dishes() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Dishes;
