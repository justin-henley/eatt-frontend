// Libraries
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MenuItemTable from '../../components/Menus/MenuItemTable';
// Hooks
import useAuth from '../../hooks/useAuth';
// Axios
import axios from '../api/axios';
const ACCOUNT_URL = '/account';

// Custom components

// CSS

export default function Account() {
  // STATE
  const [option, setOption] = useState(''); // Track which menu is selected

  const { auth } = useAuth(); // Username needed for display, check auth context

  // TODO add edit icon
  return (
    <div>
      <div>
        <h1>
          {auth.user}

          {auth.title}
        </h1>
        <Link href="/account/dishes">My Dishes</Link>
        <Link href="/account/menus">My Menus</Link>
      </div>
    </div>
  );
}

// Requires auth to access
Account.auth = true;
