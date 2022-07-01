// CSS
import styles from './MenuItemTable.module.css';

function MenuItemTable({ items = [], categoryId, buttonText = '?', buttonHandler, title }) {
  return (
    <table className={styles.table}>
      {title && (
        <thead className={styles.tHead}>
          <tr>
            <th colspan="4">{title}</th>
          </tr>
        </thead>
      )}
      <tbody className={styles.tBody}>
        {items.map((item) => (
          <tr key={item._id} className={styles.tRow}>
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
        ))}
      </tbody>
    </table>
  );
}

export default MenuItemTable;
