import { IProduct } from '../types/product.types';
import { StyledDashSideBar, StyledSideBarCtn } from './styles/dashSide.styled';
import { StyledHamburger } from '../components/styles/hamburger.styled';

interface Props {
  show: boolean;
  products: IProduct[];
  setSideBarDisp: (boolean: boolean) => void;
}

const DashSideBar = ({ show, products, setSideBarDisp }: Props) => {
  const courseTypes: string[] = products.reduce(
    (acc: string[], curr) =>
      acc.find((el) => el === curr.productCourseType)
        ? acc
        : [...acc, curr.productCourseType],
    []
  );

  const clickHandler = (): void => {
    setSideBarDisp(!show);
  };

  return (
    <>
      <StyledSideBarCtn show={show}>
        <StyledDashSideBar show={show}>
          <h2 className="sideItem">DashSideBar</h2>{' '}
          {courseTypes.map((el) => (
            <div key={el} className="sideItem">
              {el}
            </div>
          ))}
        </StyledDashSideBar>
        <StyledHamburger
          className="hamburger-lines"
          onClick={() => clickHandler()}
          sideBarDisplay={show}
        >
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </StyledHamburger>
      </StyledSideBarCtn>
    </>
  );
};

export default DashSideBar;
