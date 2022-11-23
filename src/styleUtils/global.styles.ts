import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  #root {
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   font-family: 'Inter', sans-serif;
  }
  footer{
    margin-top: auto;
    background-color: #DCC7AA
  }
  main {
    flex-grow: 1;
    padding: 1rem;
    z-index: 0;
  }
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 1rem;
  font-weight: normal;
}
`;

export default GlobalStyles;
