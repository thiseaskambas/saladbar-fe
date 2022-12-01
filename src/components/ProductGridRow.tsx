import { IProduct } from '../types/product.types';

import {
  StyledProductItem,
  StyledProductPriceItem,
} from './styles/productsTables.styles';

interface IProps {
  product: IProduct;
  onEdit: () => void;
}

const ProductGridRow = ({ product, onEdit }: IProps) => {
  return (
    <>
      <StyledProductItem>{product.name}</StyledProductItem>
      <StyledProductPriceItem>{product.price}</StyledProductPriceItem>
      <StyledProductItem>
        <span className="filename">
          {product.image.filename || 'missing name'}
        </span>
      </StyledProductItem>
      <StyledProductItem>{product.productCourseType}</StyledProductItem>
      <StyledProductItem>
        <button onClick={() => onEdit()}>edit</button>
      </StyledProductItem>
      <StyledProductItem>
        <button>delete</button>
      </StyledProductItem>
    </>
  );
};

export default ProductGridRow;
