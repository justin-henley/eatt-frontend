// Libraries
import { useState } from 'react';
import { Alert, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Link from 'next/link';
// Custom Components
import DishTile from './DishTile';
import useAuth from '../../hooks/useAuth';
import axios from '../../pages/api/axios';
// CSS
import styles from '../../styles/NewDishForm.module.css';
// Constants
const DISH_URL = '/dishes';

/**
 * NewDishForm handles the form for creating or editing dishes and submitting the data to the backend.
 * @param {Object} data - The data of an existing dish, or the default empty dish
 * @param {Boolean} edit - Flag that specifies this form is editing an existing dish.
 */

export default function NewDishForm({ data = { category: 'rice', meat: 'beef' }, edit = false }) {
  // Auth
  const { auth } = useAuth();

  // Dish data
  const [inputs, setInputs] = useState({ ...data });
  // If data was passed in from an existing dish, populate the dish tile
  const [dish, setDish] = useState(
    data.zhtw
      ? { ...data }
      : {
          // The placeholder values
          zhtw: '<Chinese>',
          pinyin: '<Pinyin>',
          en: '<English>',
          category: 'unknown',
          meat: 'unknown',
        }
  );

  // Handles changes to the input fields
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the request
    let response;
    try {
      if (edit) {
        // Patch request requires data and id to generate changelog
        response = await axios.patch(
          DISH_URL,
          { ...inputs, id: inputs.dishId },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
          }
        );
      } else {
        // Create a new dish
        response = await axios.post(
          DISH_URL,
          { ...inputs },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
          }
        );
      }

      // Creation successful
      // Set the dish data
      setDish({ ...response?.data });
      // Clear the form
      setInputs({ category: 'rice', meat: 'beef' });
    } catch (error) {
      if (error.response?.status === 401) {
        // User is not logged in
        setDish({ message: 'Unauthorized. Please log in.' });
      } else {
        // Catchall for other failures
        setDish({ message: `Creation failed: ${error.message}.` });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.result}>
        {dish.hasOwnProperty('message') ? (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>Dish {edit ? 'Edit' : 'Creation'} Failed</Alert.Heading>
            <p>Error: {dish.message}</p>
            <p>Please correct the error and try again.</p>
          </Alert>
        ) : (
          <div>
            {dish._id && (
              <Alert variant="success">
                Dish {edit ? 'edited' : 'created'} successfully.
                <br />
                <Link href={`/dishes/${dish._id}`}>
                  <a target="_blank">Open dish in new window.</a>
                </Link>
              </Alert>
            )}
            <DishTile item={dish} />
          </div>
        )}
      </div>
      {/* If editing a dish, form disappears after successful submission */}
      {((edit && inputs.zhtw) || !edit) && (
        <Form action="post" onSubmit={handleSubmit} className={styles.form}>
          <h1>{edit ? 'Edit this' : 'Create a new'} dish:</h1>

          <Form.Group
            as="fieldset"
            className={styles.nameGroup}
            aria-label="Please enter the Chinese, Pinyin, and English names of the new dish."
          >
            <Form.Label as="legend" aria-hidden>
              Dish Name
            </Form.Label>
            <FloatingLabel controlId="floatingChinese" label="Chinese Name">
              <Form.Control
                type="text"
                placeholder="牛肉麵"
                required
                name="zhtw"
                value={inputs.zhtw || ''}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPinyin" label="Hanyu Pinyin Name">
              <Form.Control
                type="text"
                placeholder="niú ròu miàn"
                required
                name="pinyin"
                value={inputs.pinyin || ''}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingEnglish" label="English Name">
              <Form.Control
                type="text"
                placeholder="Beef Noodles"
                required
                name="en"
                value={inputs.en || ''}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group
            as="fieldset"
            className={styles.detailsGroup}
            aria-label="Please choose the relevant category and protein type for the dish"
          >
            <Form.Label as="legend">Dish Details</Form.Label>
            <Row className={styles.row}>
              <Col xs="auto" className={styles.column}>
                <FloatingLabel controlId="floatingCategory" label="Dish Category">
                  <Form.Select
                    aria-label="Category of the dish"
                    name="category"
                    required
                    value={inputs.category || ''}
                    onChange={handleChange}
                    placeholder="wat"
                  >
                    <option value="rice">Rice</option>
                    <option value="noodle">Noodle</option>
                    <option value="bread">Bread, Crepe, Sandwich, etc.</option>
                    <option value="soup">Soup, Stew, or Curry</option>
                    <option value="drink">Beverage</option>
                    <option value="unknown">Unknown</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col xs="auto" className={styles.column}>
                <FloatingLabel controlId="floatingMeat" label="Protein Type">
                  <Form.Select
                    aria-label="Protein type of the dish"
                    name="meat"
                    required
                    value={inputs.meat || ''}
                    onChange={handleChange}
                  >
                    <option value="beef">Beef </option>
                    <option value="pork">Pork</option>
                    <option value="bird">Poultry</option>
                    <option value="fish">Seafood</option>
                    <option value="egg">Egg</option>
                    <option value="veg">Vegetarian</option>
                    <option value="unknown">Unknown</option>
                    <option value="other">Other</option>
                    <option value="none">None</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Form.Group>
          <button type="submit" className={styles.submit} aria-label="Create this dish">
            {edit ? 'Save' : 'Create'}
          </button>
        </Form>
      )}
    </div>
  );
}
