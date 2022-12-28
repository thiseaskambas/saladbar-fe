import MediaQuery from 'react-responsive';
import {
  StyledSharedDeleteBtn,
  StyledSharedPriceTd,
  StyledSharedTd,
  StyledSharedTr,
} from '../pages/styles/shared.styles';
import { IProduct } from '../types/product.types';

interface IProps {
  product: IProduct;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductTr = ({ product, onEdit, onDelete }: IProps) => {
  return (
    <StyledSharedTr clickable={true}>
      <StyledSharedTd onClick={() => onEdit()}>{product.name}</StyledSharedTd>
      <MediaQuery minWidth={999}>
        <StyledSharedPriceTd onClick={() => onEdit()}>
          {product.price}
        </StyledSharedPriceTd>

        <StyledSharedTd onClick={() => onEdit()}>
          {product.productCourseType}
        </StyledSharedTd>
      </MediaQuery>
      <StyledSharedTd onClick={() => onDelete()}>
        <StyledSharedDeleteBtn />
      </StyledSharedTd>
    </StyledSharedTr>
  );
};

export default ProductTr;
