import { IProduct } from '../types/product.types';

import {
  StyledDeleteSymbolBtn,
  StyledPriceTd,
  StyledTd,
  StyledTr,
} from './styles/productsTables.styles';

interface IProps {
  product: IProduct;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductTr = ({ product, onEdit, onDelete }: IProps) => {
  return (
    <StyledTr>
      <StyledTd onClick={() => onEdit()}>{product.name}</StyledTd>
      <StyledPriceTd onClick={() => onEdit()}>{product.price}</StyledPriceTd>
      <StyledTd onClick={() => onEdit()}>
        <span className="filename">
          {product.image.filename || 'missing name'}
        </span>
      </StyledTd>
      <StyledTd onClick={() => onEdit()}>{product.productCourseType}</StyledTd>
      <StyledTd onClick={() => onDelete()}>
        <StyledDeleteSymbolBtn>&#10008;</StyledDeleteSymbolBtn>
      </StyledTd>
    </StyledTr>
  );
};

export default ProductTr;