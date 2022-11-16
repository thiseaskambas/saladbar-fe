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
  nav {
   top: 0;
    padding: 1rem;
    z-index: 1;
  }
  .error{
    border-color: red;
  }
`;

export default GlobalStyles;
