// Outside Components
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Custom Components

// CSS
import styles from './DishSearchForm.module.css';

// TODO onChange seems like it generates a crazy number of db requests
// Also its a bit flaky
// Maybe change to a submit button, OR cache all results locally and search the cache

function DishSearchForm({ searchTerm, searchType, handleInput, handleChange }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
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
            />
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default DishSearchForm;
