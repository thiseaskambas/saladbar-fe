import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  #root {
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   background-color: skyblue;
  }
  footer{
    margin-top: auto;
  }
  main {
    background-color: aliceblue;
  }
  nav {
   top: 0;
    padding: 1rem;
  }
  .error{
    border-color: red;
  }
`;

export default GlobalStyles;
