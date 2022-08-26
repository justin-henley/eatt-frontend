// Libraries
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// CSS
import styles from '../../styles/DishSearchFormGroup.module.css';

/**
 * Displays the form for searching for dishes OR menus
 * Must be wrapped in a react-bootstrap Form component in the parent
 * @param {String} searchTerm - The search text entered by the user
 * @param {String} searchType - The language the user is searching in, i.e. English
 * @param {Function} handleInput - Handles changes to the searchTerm
 * @param {Function} handleChange - Handles changes to the searchType
 */
//
export default function DishSearchForm({ searchTerm, searchType, handleInput, handleChange }) {
  return (
    <Form.Group className="" controlId="formSearch">
      <Row className={styles.row1}>
        <Col xs="auto" className={styles.col1}>
          <Form.Select className={styles.searchLanguage} size="sm" value={searchType} onChange={handleChange}>
            <option value="en">English</option>
            <option value="zhtw">Chinese</option>
            <option value="pinyinNoDiacritics">Hanyu Pinyin</option>
          </Form.Select>
        </Col>
        <Col xs="auto" className={styles.col2}>
          <FormControl
            size="sm"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onInput={handleInput}
            className={styles.searchText}
            autoFocus
          />
        </Col>
      </Row>
    </Form.Group>
  );
}
