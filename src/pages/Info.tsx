import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessageForm from '../components/MessageForm';
import Modal from '../components/Modal';
import Notification from '../components/Notification';
import { getLatestMessage } from '../store/message.slice';
import { RootState, useAppDispatch } from '../store/store';
import {
  StyledSharedColoredBtn,
  StyledSharedMain,
} from './styles/shared.styles';

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
    <StyledSharedMain>
      <Notification notification={notificationState} />
      <h1>Info page</h1>
      {lastMessage && (
        <article>
          <h2>{lastMessage.title}</h2>
          <section>{lastMessage.text}</section>
          <footer>{lastMessage.createdBy}</footer>
        </article>
      )}
      {authState.user?.role !== 'user' && (
        <StyledSharedColoredBtn
          bgColor="PURPLE"
          onClick={() => setIsModalOpen(true)}
        >
          New Message
        </StyledSharedColoredBtn>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle="New message"
      >
        <MessageForm />
      </Modal>
    </StyledSharedMain>
  );
};

export default Info;
