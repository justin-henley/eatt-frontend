// Outside components
import { Outlet } from 'react-router-dom';
// Custom components
import GlobalNav from './GlobalNav';
import GlobalFooter from './GlobalFooter';
// CSS
import styles from './App.module.css';

function App() {
  return (
    <div>
      <GlobalNav />
      <div className={styles.bodyDiv}>
        <Outlet />
      </div>
      <GlobalFooter />
    </div>
  );
}

export default App;
