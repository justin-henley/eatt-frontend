// Libraries
// import Placeholder from 'react-bootstrap/Placeholder';
// CSS
import styles from '../../styles/MenuItemTable.module.css';

function MenuItemTable({ items, categoryId = 1, buttonText = '?', buttonHandler, title }) {
  return (
    <table className={styles.table}>
      {
        // Only displays the table headers if it is the added section OR there are search results to display
        (items.length !== 0 || title === 'Added Dishes') && (
          <thead className={styles.tHead}>
            <tr>
              <th colSpan="4">{title}</th>
            </tr>
            <tr>
              <th>Mandarin</th>
              <th>Pinyin</th>
              <th>English</th>
              <th>{buttonText === '+' ? 'Add' : buttonText === '-' ? 'Remove' : 'Edit'}</th>
            </tr>
          </thead>
        )
      }
      <tbody className={styles.tBody}>
        {title === 'Added Dishes' && items.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center', fontStyle: 'italic' }}>
              Please use the search bar below to find and add items
            </td>
          </tr>
        ) : (
          items.map((item) => (
            // The add handler uses _id from the db, the remove handler uses id without the underscore, so both are handled here
            <tr key={`${categoryId}${item.id || item._id}`} className={styles.tRow}>
              <td className={styles.tData}>{item.zhtw}</td>

              <td className={styles.tData}>{item.pinyin}</td>
              <td className={styles.tData}>{item.en}</td>
              <td className={styles.tData}>
                <button
                  type="button"
                  onClick={buttonHandler}
                  data-category-id={categoryId}
                  // The add handler uses _id from the db, the remove handler uses id without the underscore, so both are handled here
                  data-dish-id={item._id || item.id}
                  data-zhtw={item.zhtw}
                  data-pinyin={item.pinyin}
                  data-en={item.en}
                  data-meat={item.meat}
                  data-category={item.category}
                >
                  {buttonText}
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default MenuItemTable;
