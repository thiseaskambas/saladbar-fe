import Hamburger from './Hamburger';
import { IProduct, ProductCourseType } from '../types/product.types';
import {
  StyledSideLiItem,
  StyledDashSideBar,
  StyledSideBarCtn,
  StyledSideBarHeading,
} from './styles/dashSide.styled';

interface Props {
  show: boolean;
  products: IProduct[];
  setSideBarDisp: (boolean: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsSelected: (e: any) => void;
  selected: ProductCourseType | 'all';
}

const DashSideBar = ({
  show,
  products,
  setSideBarDisp,
  setIsSelected,
  selected,
}: Props) => {
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
          <StyledSideBarHeading className="sideItem">
            Categories:
          </StyledSideBarHeading>{' '}
          <ul className="sideItem">
            <StyledSideLiItem
              onClick={setIsSelected}
              selected={selected === 'all'}
            >
              <h2>all</h2>
            </StyledSideLiItem>
            {courseTypes.map((el) => (
              <StyledSideLiItem
                key={el}
                className="sideItem"
                onClick={setIsSelected}
                selected={selected === el}
              >
                <h2>{el}</h2>
              </StyledSideLiItem>
            ))}
          </ul>
        </StyledDashSideBar>
        <Hamburger clickHandler={clickHandler} show={show} />
      </StyledSideBarCtn>
    </>
  );
};

export default DashSideBar;
