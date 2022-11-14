import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
const MainDashBoard = () => {
  const productsState = useSelector((state: RootState) => state.products);
  console.log(productsState.products);
  return <div>MainDashBoard</div>;
};

export default MainDashBoard;
