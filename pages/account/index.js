// Libraries
import Link from 'next/link';
// Hooks
import useAuth from '../../hooks/useAuth';
// TODO CSS

export default function Account() {
  // Username and user title stored in auth
  const { auth } = useAuth();

  return (
    <div>
      <div>
        <h1>{auth.user}</h1>
        <h2>{auth.title}</h2>
        <Link href="/account/dishes">My Dishes</Link>
        <br />
        <Link href="/account/menus">My Menus</Link>
      </div>
    </div>
  );
}

// Requires auth to access
Account.auth = true;
