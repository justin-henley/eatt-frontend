// Libraries
import Link from 'next/link';
// Custom components
import MenuName from './MenuName';
// CSS
import styles from '../../styles/MenuDisplay.module.css';

/**
 * Displays the Name of the restaurant as a link to the full menu
 * @requires MenuName
 * @param {[Object]} menus - An array of menus to display and link to
 */
export default function MenuDisplay({ menus }) {
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
}
