import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import CartsDash from './pages/CartsDash';
import Today from './pages/Today';
import Info from './pages/Info';
import Login from './pages/Login';
import MainDashBoard from './pages/MainDashBoard';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';
import ProductCreateNew from './pages/ProductCreateNew';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import RequireAuth from './wraperComponents/RequireAuth';
import PersistLogin from './wraperComponents/PersistLogin';

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={['user', 'admin', 'dev']} />}>
        <Route path="/dashboard" element={<MainDashBoard />} />
        <Route path="/" element={<Info />} />
        <Route path="/day-view" element={<Today />} />
        <Route path="/carts">
          <Route index element={<CartsDash />} />
          <Route path="current" element={<Cart />} />
        </Route>
        <Route path="/products">
          <Route index element={<Products />} />
          <Route path="create" element={<ProductCreateNew />} />
        </Route>
        <Route path="/users">
          <Route index element={<Users />} />
          <Route path="me" element={<UserProfile />} />
        </Route>
      </Route>
    </Route>
    <Route path="/unauthorized" element={<h1>Unauthorized!</h1>} />
    <Route path="*" element={<h1>Not found!</h1>} />
  </Routes>
);

export default AppRouter;
