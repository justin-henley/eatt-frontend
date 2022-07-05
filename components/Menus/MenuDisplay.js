// Libraries
import Link from 'next/link';
// Custom components
import MenuName from './MenuName';
// CSS
import styles from '../../styles/MenuDisplay.module.css';

const MenuDisplay = ({ menus }) => {
  return (
    <div>
      {menus?.map((menu) => (
        <Link href={`/menus/${menu._id}`} key={menu._id}>
          <a className={styles.link}>
            <MenuName restaurant={menu.restaurant} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MenuDisplay;
