import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessageForm from '../components/MessageForm';
import Modal from '../components/Modal';
import Notification from '../components/Notification';
import { getLatestMessage } from '../store/message.slice';
import { RootState, useAppDispatch } from '../store/store';
import {
  StyledArticle,
  StyledInfoCtnDiv,
  StyledInfoMain,
} from './styles/info.styles';
import { StyledSharedColoredBtn } from './styles/shared.styles';

const Info = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authState = useSelector((state: RootState) => state.auth);
  const notificationState = useSelector(
    (state: RootState) => state.notification
  );
  const messages = useSelector((state: RootState) => state.messages);
  useEffect(() => {
    let mounted = true;
    if (mounted && messages.status === 'idle') {
      dispatch(getLatestMessage());
    }
    return () => {
      mounted = false;
    };
  }, []);
  const lastMessage = messages.messages[0];
  console.log(lastMessage);
  return (
    <StyledInfoMain>
      <Notification notification={notificationState} />
      <h1>Info page</h1>
      <StyledInfoCtnDiv>
        {lastMessage && (
          <StyledArticle>
            <h2>{lastMessage.title}</h2>
            <section>{lastMessage.text}</section>
            <footer>{lastMessage.createdBy.username}</footer>
          </StyledArticle>
        )}
        {authState.user?.role !== 'user' && (
          <StyledSharedColoredBtn
            className="new-msg"
            bgColor="PURPLE"
            borderSquare
            onClick={() => setIsModalOpen(true)}
          >
            New Message
          </StyledSharedColoredBtn>
        )}
      </StyledInfoCtnDiv>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle="New message"
      >
        <MessageForm />
      </Modal>
    </StyledInfoMain>
  );
};

export default Info;
