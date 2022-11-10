import AppRouter from './AppRouter';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import GlobalStyles from './layouts/styles/global.styles';

function App() {
  // const [products, setProducts] = useState([]);
  // console.count('app');

  // useEffect(() => {
  //   let subscribed = true;
  //   console.count('effect');
  //   axios.get('http://localhost:3001/api/v1/products').then((response) => {
  //     console.log('promise fulfilled');
  //     if (subscribed) {
  //       console.log(response.data);
  //       setProducts(response.data);
  //     }
  //   });
  //   return () => {
  //     subscribed = false;
  //   };
  // }, []);

  return (
    <>
      <GlobalStyles />
      <NavBar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
