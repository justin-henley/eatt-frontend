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
  const [dishes, setDishes] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  // FUNCTIONS

  // Fetch all dishes by user
  // Username is passed to backend encoded in JWT token. No need to pass it in the requests.
  const getUserDishes = async () => {
    // Request the data
    const results = await axios.get(`${ACCOUNT_URL}/dishes`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
    });

    // Store the returned data
    setDishes(results.data);
  };

  // Edit the target dish
  const handleEditDish = (e) => {
    const dish = { ...e.target.dataset };
    console.log(dish);
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

  // TODO add edit icon
  return (
    <div>
      {/* <div>
        <h1>{auth.user}</h1>
        <p>{auth.title}</p>
      </div> */}
      <div>
        {dishes ? (
          <MenuItemTable
            items={dishes}
            buttonText={<MdEdit />}
            buttonHandler={handleEditDish}
            title={`Your ${dishes.length} Dish${dishes.length === 1 ? '' : 'es'}`}
          />
        ) : (
          <p>You have not created any dishes yet.</p>
        )}
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
