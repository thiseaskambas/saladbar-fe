import { IProduct } from '../types/product.types';

import {
  StyledBtnCtnDiv,
  StyledCancelBtn,
  StyledConfirmBtn,
  StyledModalCtnDiv,
} from './styles/modal.styles';

interface IProps {
  productName: IProduct['name'];
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteProduct = ({ productName, onCancel, onDelete }: IProps) => {
  return (
    <StyledModalCtnDiv>
      <div>
        Are you sure you want to delete <b>{productName} ?</b>
      </div>
      <StyledBtnCtnDiv>
        <StyledConfirmBtn onClick={onDelete}>Delete</StyledConfirmBtn>
        <StyledCancelBtn onClick={onCancel}>Cancel</StyledCancelBtn>
      </StyledBtnCtnDiv>
    </StyledModalCtnDiv>
  );
};

export default DeleteProduct;
