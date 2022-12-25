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
      <StyledSharedPriceTd onClick={() => onEdit()}>
        {product.price}
      </StyledSharedPriceTd>
      <StyledSharedTd onClick={() => onEdit()}>
        <span className="italic">
          {product.image.filename || 'missing name'}
        </span>
      </StyledSharedTd>
      <StyledSharedTd onClick={() => onEdit()}>
        {product.productCourseType}
      </StyledSharedTd>
      <StyledSharedTd onClick={() => onDelete()}>
        <StyledSharedDeleteBtn />
      </StyledSharedTd>
    </StyledSharedTr>
  );
};

export default ProductTr;
