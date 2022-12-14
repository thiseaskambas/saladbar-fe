import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  #root {
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   font-family: 'Inter', sans-serif;
   
  }


  main {
    flex-grow: 1;
    padding: 1rem;
    z-index: 0;
  }

  #portal{
    font-family: 'Inter', sans-serif;
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


button {
  transition: all 200ms;
  :hover{
    filter: brightness(110%);
  }
  :active {
    transform: scale(97%);
    filter: brightness(90%);
  }
}
`;

export default GlobalStyles;
