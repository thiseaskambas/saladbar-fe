import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledInnerDiv,
  StyledMessageCtn,
  StyledImgCtn,
} from '../pages/styles/form.styles';
import images from '../assets';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IFormValues {
  email: string;
  username: string;
  fullname: string;
  password: string;
  passwordConfirmation: string;
  editing?: boolean;
  confrim?: boolean;
}

const UserForm = () => {
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  console.log({ loggedUser });
  const initialValues: IFormValues = {
    email: loggedUser?.email || '',
    username: loggedUser?.username || '',
    password: '',
    passwordConfirmation: '',
    fullname: loggedUser?.fullName || '',
    editing: Boolean(loggedUser),
    confrim: false,
  };
  const validationSchema = Yup.object({
    editing: Yup.boolean(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Please fill in your email'),
    username: Yup.string().required('Please fill in your username'),
    fullName: Yup.string(),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
        'The password must contain letters and numbers and must be at least 5 characters long'
      )
      .when('editing', {
        is: false,
        then: Yup.string()
          .required('Please fill in your password')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
            'The password must contain letters and numbers and must be at least 5 characters long'
          ),
      }),

    passwordConfirmation: Yup.string()
      .notRequired()
      .when('password', {
        is: (value: string) => value?.length,
        then: Yup.string()
          .required('Please validate your password')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })

      .when('editing', {
        is: false,
        then: Yup.string()
          .required('Please validate your password')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values, actions), actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <StyledForm onSubmit={formik.handleSubmit}>
          {!loggedUser && (
            <StyledImgCtn>
              <img src={images['logo.blue.XS.png']} alt="" />
            </StyledImgCtn>
          )}

          <StyledInnerDiv>
            <label htmlFor="fullname">Full Name</label>
            <Field type="text" name="fullname" />
            <StyledMessageCtn>
              <ErrorMessage name="fullname" />
            </StyledMessageCtn>
          </StyledInnerDiv>

          <StyledInnerDiv>
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <StyledMessageCtn>
              <ErrorMessage name="username" />
            </StyledMessageCtn>
          </StyledInnerDiv>

          {loggedUser ? (
            <StyledInnerDiv>
              <div>{loggedUser.email}</div>
            </StyledInnerDiv>
          ) : (
            <StyledInnerDiv>
              <label htmlFor="email">email</label>
              <Field type="email" name="email" />
              <StyledMessageCtn>
                <ErrorMessage name="email" />
              </StyledMessageCtn>
            </StyledInnerDiv>
          )}

          <StyledInnerDiv>
            <label htmlFor="password">password</label>
            <Field name="password" type="password" />
            <StyledMessageCtn>
              <ErrorMessage name="password" />
            </StyledMessageCtn>
          </StyledInnerDiv>

          <StyledInnerDiv>
            <label htmlFor="passwordConfirmation">password confirmation</label>
            <Field name="passwordConfirmation" type="password" />
            <StyledMessageCtn>
              <ErrorMessage name="passwordConfirmation" />
            </StyledMessageCtn>
          </StyledInnerDiv>

          <StyledInnerDiv>
            <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
              {loggedUser ? 'Update' : 'Sign-up now'}
            </button>
          </StyledInnerDiv>
        </StyledForm>
      )}
    </Formik>
  );
};

export default UserForm;
