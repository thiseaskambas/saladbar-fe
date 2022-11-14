import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import CartsDash from './pages/CartsDash';
import Product from './pages/Product';
import Day from './pages/Day';
import Home from './pages/Home';
import Login from './pages/Login';
import MainDashBoard from './pages/MainDashBoard';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';
import ProductForm from './pages/ProductForm';
import Products from './pages/Products';
import CartEditForm from './pages/CartEditForm';
import SignUp from './pages/SignUp';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element={<MainDashBoard />} />
    <Route path="/day-view" element={<Day />} />
    <Route path="/carts">
      <Route index element={<CartsDash />} />
      <Route path="current" element={<Cart />} />
      <Route path=":id" element={<Cart />} />
      <Route path=":id/edit" element={<CartEditForm />} />
    </Route>
    <Route path="/products">
      <Route index element={<Products />} />
      <Route path="create" element={<ProductForm />} />
      <Route path=":id" element={<Product />} />
      <Route path=":id/edit" element={<ProductForm />} />
    </Route>
    <Route path="/users">
      <Route index element={<Users />} />
      <Route path="me" element={<UserProfile />} />
      <Route path=":id" element={<UserProfile />} />
    </Route>
    <Route path="*" element={<h1>Not found!</h1>} />
  </Routes>
);

export default AppRouter;
