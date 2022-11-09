import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/login'}>Login</NavLink>
        </li>
        <li>
          <NavLink to={'/users/me'}>My Profile</NavLink>
        </li>
        <li>
          <NavLink to={'/main-dash'}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to={'/carts/current'}>Cart</NavLink>
        </li>
        <li>
          <NavLink to={'/day-view'}>Today</NavLink>
        </li>
        <li>
          <NavLink to={'/products/create'}>Create Product</NavLink>
        </li>
        <li>
          <NavLink to={'/users'}>All Users</NavLink>
        </li>
        <li>
          <NavLink to={'/carts'}>Cart Data</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
