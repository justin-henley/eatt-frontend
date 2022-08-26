// Libraries
import { FloatingLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

export default function MenuNewRestaurantForm({ restaurant, handleChange }) {
  // TODO test with screen reader and add aria labels where needed
  return (
    <FormGroup
      as="fieldset"
      aria-label="Enter the name of the restaurant in Traditional Chinese, Hanyu Pinyin, and English."
    >
      <Form.Label as="legend">Restaurant</Form.Label>
      <FloatingLabel controlId="floatingRestaurantChinese" label="Traditional Chinese">
        <FormControl
          type="text"
          size="sm"
          name="zhtw"
          required
          value={restaurant?.zhtw || ''}
          onChange={handleChange}
          placeholder="Traditional Chinese"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingRestaurantPinyin" label="Hanyu Pinyin">
        <FormControl
          type="text"
          size="sm"
          name="pinyin"
          required
          value={restaurant?.pinyin || ''}
          onChange={handleChange}
          placeholder="Hanyu Pinyin"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingRestaurantEnglish" label="English">
        <FormControl
          type="text"
          size="sm"
          name="en"
          required
          value={restaurant?.en || ''}
          onChange={handleChange}
          placeholder="English"
        />
      </FloatingLabel>
    </FormGroup>
  );
}
