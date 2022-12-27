import * as Yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { createMessage } from '../store/message.slice';
import {
  setAsyncNotification,
  setNotification,
} from '../store/notification.slice';
import {
  StyledForm,
  StyledInnerDiv,
  StyledMessageCtn,
} from '../pages/styles/form.styles';
import Notification from './Notification';
import { StyledSharedColoredBtn } from '../pages/styles/shared.styles';

interface IFormValues {
  title: string;
  text: string;
  importance: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Please enter a title')
    .min(5, 'Min 5 characters')
    .max(20, 'Max 20 characters'),
  text: Yup.string()
    .required('Please fill in your message')
    .min(5, 'Min 5 characters')
    .max(4000, 'Write a message not a novel'),
  importance: Yup.number().min(1, 'Min is 1').max(3, 'Max is 3'),
});

const MessageForm = () => {
  const dispatch = useAppDispatch();
  const notification = useSelector((state: RootState) => state.notification);
  const initialValues: IFormValues = {
    text: '',
    title: '',
    importance: '1',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          dispatch(
            setNotification({
              text: 'Saving your message, hold on...',
              type: 'loading',
            })
          );
          await dispatch(createMessage(values)).unwrap();
          dispatch(
            setAsyncNotification({
              type: 'success',
              text: 'Message saved!',
              time: 5,
            })
          );
          actions.resetForm({ values: { ...initialValues } });
          actions.setSubmitting(false);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          await dispatch(
            setAsyncNotification({ type: 'error', text: err.message, time: 5 })
          );
        }
      }}
    >
      {(formik) => (
        <StyledForm onSubmit={formik.handleSubmit}>
          <Notification notification={notification} />
          <StyledInnerDiv>
            <label htmlFor="title">Message title:</label>
            <Field type="text" name="title" autoComplete="off" />
            <StyledMessageCtn>
              <ErrorMessage name="title" />
            </StyledMessageCtn>
          </StyledInnerDiv>
          <StyledInnerDiv>
            <label htmlFor="text">Message text:</label>
            <Field type="text" name="text" autoComplete="off" />
            <StyledMessageCtn>
              <ErrorMessage name="text" />
            </StyledMessageCtn>
          </StyledInnerDiv>
          <StyledInnerDiv>
            <Field name="importance" as="select">
              <option value="disabled" disabled={true}>
                --select importance--
              </option>
              <option value="1">Normal</option>
              <option value="2">High</option>
              <option value="3">Very High</option>
            </Field>
          </StyledInnerDiv>
          <StyledInnerDiv>
            <StyledSharedColoredBtn bgColor="PURPLE" type="submit" borderSquare>
              Submit
            </StyledSharedColoredBtn>
          </StyledInnerDiv>
        </StyledForm>
      )}
    </Formik>
  );
};

export default MessageForm;
