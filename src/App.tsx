import AppRouter from './AppRouter';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import GlobalStyles from './layouts/styles/global.styles';

function App() {
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
