import { StyledHamburger } from './styles/hamburger.styled';

interface Props {
  clickHandler: () => void;
  show: boolean;
}

const Hamburger = (props: Props) => (
  <StyledHamburger
    className="hamburger-lines"
    onClick={() => props.clickHandler()}
    sideBarDisplay={props.show}
  >
    <div>
      <div className="line line1"></div>
      <div className="line line2"></div>
      <div className="line line3"></div>
    </div>
  </StyledHamburger>
);

export default Hamburger;
