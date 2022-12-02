import { IProduct } from '../types/product.types';
import { StyledCtnDiv } from './styles/deleteProduct.styles';
import {
  StyledBtnCtnDiv,
  StyledCancelBtn,
  StyledDeleteBtn,
} from './styles/modal.styles';

interface IProps {
  productName: IProduct['name'];
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteProduct = ({ productName, onCancel, onDelete }: IProps) => {
  return (
    <StyledCtnDiv>
      <div>
        Are you sure you want to delete{' '}
        <span className="productname">{productName} ?</span>
      </div>
      <StyledBtnCtnDiv>
        <StyledDeleteBtn onClick={onDelete}>Delete</StyledDeleteBtn>
        <StyledCancelBtn onClick={onCancel}>Cancel</StyledCancelBtn>
      </StyledBtnCtnDiv>
    </StyledCtnDiv>
  );
};

export default DeleteProduct;
