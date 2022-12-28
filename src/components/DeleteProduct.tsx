import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IProduct } from '../types/product.types';
import Notification from './Notification';

import {
  StyledBtnCtnDiv,
  StyledCancelBtn,
  StyledConfirmBtn,
  StyledMessageCtnDiv,
  StyledModalCtnDiv,
} from './styles/modal.styles';

interface IProps {
  productName: IProduct['name'];
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteProduct = ({ productName, onCancel, onDelete }: IProps) => {
  const notification = useSelector((state: RootState) => state.notification);
  return (
    <StyledModalCtnDiv>
      <StyledMessageCtnDiv>
        Are you sure you want to delete <b>{productName} ?</b>
        <Notification notification={notification} />
      </StyledMessageCtnDiv>

      <StyledBtnCtnDiv>
        <StyledConfirmBtn onClick={onDelete}>Delete</StyledConfirmBtn>
        <StyledCancelBtn onClick={onCancel}>Cancel</StyledCancelBtn>
      </StyledBtnCtnDiv>
    </StyledModalCtnDiv>
  );
};

export default DeleteProduct;
