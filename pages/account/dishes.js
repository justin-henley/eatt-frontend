// Libraries
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
// Hooks
import useAuth from '../../hooks/useAuth';
// Axios
import axios from '../api/axios';
const ACCOUNT_URL = '/account';

// Custom components
import MenuItemTable from '../../components/Menus/MenuItemTable';
import NewDishForm from '../../components/Dish/NewDishForm';
// TODO CSS

// Icons
import { MdEdit } from 'react-icons/md';

export default function UserDishes() {
  // AUTH
  const { auth } = useAuth();

  // STATE
  const [dishes, setDishes] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  // FUNCTIONS

  // Fetch all dishes by user
  // Username is passed to backend encoded in JWT token. No need to pass it in the requests.
  const getUserDishes = async () => {
    try {
      // Request the data
      const results = await axios.get(`${ACCOUNT_URL}/dishes`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
      });

      // Store the returned data
      setDishes(results.data);
    } catch (error) {
      setDishes([]);
    }
  };

  // Edit the target dish
  const handleEditDish = (e) => {
    const dish = { ...e.target.dataset };
    setData(dish);
    handleShow();
  };

  // Close the modal, clear the edit data, and refresh dishes
  const handleClose = () => {
    setShow(false);
    setData({});
    getUserDishes();
  };

  // Open the modal
  const handleShow = () => setShow(true);

  // EFFECTS
  // Get dish data once on component load
  useEffect(() => {
    getUserDishes();
  }, []);
  // Reload when dishes are updated
  useEffect(() => {}, [dishes]);

  // TODO Using an icon in edit means you click on the icon with no data, instead of the button itself
  return (
    <div>
      <div>
        <MenuItemTable
          items={dishes}
          buttonText={'Edit'}
          buttonHandler={handleEditDish}
          title={`${auth.user[0].toUpperCase() + auth.user.slice(1)}, you have created ${dishes.length} dish${
            dishes.length === 1 ? '' : 'es'
          }.`}
        />
      </div>
      <div>
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit this dish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewDishForm data={data} edit={true} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

UserDishes.auth = true;
