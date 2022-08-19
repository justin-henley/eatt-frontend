// Libraries
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef, useEffect } from 'react';
// Custom Components

// CSS
import styles from '../../styles/DishSearchFormGroup.module.css';

// Must be wrapped in a react-bootstrap Form component in the parent
function DishSearchForm({ searchTerm, searchType, handleInput, handleChange }) {
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

export default DishSearchForm;
