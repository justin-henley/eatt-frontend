// Libraries
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
// Hooks
import useAuth from '../../hooks/useAuth';
// Axios
import axios from '../api/axios';
const ACCOUNT_URL = '/account';

// Custom components
import MenuItemTable from '../../components/Menus/MenuItemTable';
import NewMenuForm from '../../components/Menus/NewMenuForm';
// TODO CSS

// Icons
import { MdEdit } from 'react-icons/md';

export default function UserMenus() {
  // AUTH
  const { auth } = useAuth();

  // STATE
  const [menus, setMenus] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  // FUNCTIONS

  // Fetch all menus by user
  const getUserMenus = async () => {
    try {
      const results = await axios.get(`${ACCOUNT_URL}/menus`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
      });

      // Store the returned data
      setMenus(
        results.data.map((menu) => {
          return { ...menu.restaurant, id: menu._id };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Edit the target menu
  const handleEditMenu = async (e) => {
    // Get the restaurant data from the target element
    const menu = { ...e.target.dataset };
    console.log(menu);

    // Request the full menu data from the backend
    const response = await axios.get(`/menus/${menu.dishId}`, { headers: { 'Content-Type': 'application/json' } });
    setData(response.data);
    handleShow();
  };

  // Close the modal, clear the data, and refresh the menus
  const handleClose = () => {
    setShow(false);
    /* setData({}); */
    getUserMenus();
  };

  // Open the modal
  const handleShow = () => setShow(true);

  // EFFECTS
  // Get menu data once on component load
  useEffect(() => {
    getUserMenus();
  }, []);
  // Reload when dishes are updated
  useEffect(() => {}, [menus]);

  // TODO add edit icon if you can solve the selection issue
  return (
    <div>
      <div>
        <div>
          <MenuItemTable
            items={menus}
            buttonHandler={handleEditMenu}
            buttonText="Edit"
            title={`${auth.user[0].toUpperCase() + auth.user.slice(1)}, you have created ${menus.length} menu${
              menus.length === 1 ? '' : 's'
            }.`}
          />
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit this menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewMenuForm data={data} edit={true} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

UserMenus.auth = true;
