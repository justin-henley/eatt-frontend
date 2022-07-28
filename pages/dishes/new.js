// Libraries
import { useState } from 'react';
import { Alert, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Link from 'next/link';
// Custom Components
import DishTile from '../../components/Dish/DishTile';
import axios from '../api/axios';
// CSS
import styles from '../../styles/NewDishForm.module.css';
// Constants
const DISH_URL = '/dishes';

// TODO Hardcoding the category and meat types is bad. Find a way to retrieve them.
// TODO login
export default function NewDishForm() {
  const [inputs, setInputs] = useState({ category: 'rice', meat: 'beef' });
  const [dish, setDish] = useState({
    // The placeholder values
    zhtw: '<Chinese>',
    pinyin: '<Pinyin>',
    en: '<English>',
    category: 'unknown',
    meat: 'unknown',
  });

  // Handles changes to the input fields
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // TODO input validation
    e.preventDefault();

    // Submit the new dish and await a response
    /* const dish = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inputs),
      // TODO this request doesn't pass credentials. Try axios or google it
    }); */
    const response = await axios.post(
      DISH_URL,
      { ...inputs },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    // TODO trycatch

    // Check result
    if (response.status === 401) {
      // User is not logged in
      setDish({ message: 'Unauthorized. Please log in.' });
    } else if (response.ok === false) {
      // Catchall for other failures
      setDish({ message: 'Creation failed for unknown reason.' });
    } else {
      // Creation successful
      // Await for the json version of the results
      console.log(response);
      // Set the dish data
      setDish({ ...response.data });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.result}>
        {dish.hasOwnProperty('message') ? (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>Dish Creation Failed</Alert.Heading>
            <p>Error: {dish.message}</p>
            <p>Please correct the error and try again.</p>
          </Alert>
        ) : (
          <div>
            {dish._id && (
              <Alert variant="success">
                Dish created successfully.
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

      <Form action="post" onSubmit={handleSubmit} className={styles.form}>
        <h1>Create a new dish:</h1>

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
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Form.Group>
        <button type="submit" className={styles.submit} aria-label="Create this dish">
          Create
        </button>
      </Form>
    </div>
  );
}

// Requires auth to access
// TODO roles
NewDishForm.auth = true;
