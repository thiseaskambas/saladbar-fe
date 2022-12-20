import { Formik, Field, ErrorMessage } from 'formik';
import {
  StyledForm,
  StyledInnerDiv,
  StyledMessageCtn,
  StyledImgCtn,
} from '../pages/styles/form.styles';
import images from '../assets';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { updateOneUser } from '../store/users.slice';
import { signupUser, updateLoggedUser, updatePwd } from '../store/auth.slice';
import { validationSchema } from './userForm.schema';

interface IFormValues {
  email: string;
  username: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
  editing: boolean;
  confrim: boolean;
  oldPassword: string;
}

interface IUpdateValues {
  username?: string;
  fullName?: string;
}

const UserForm = () => {
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const initialValues: IFormValues = {
    email: loggedUser?.email || '',
    username: loggedUser?.username || '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    fullName: loggedUser?.fullName || '',
    editing: Boolean(loggedUser),
    confrim: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        let updated = null;
        if (loggedUser) {
          const newValues: IUpdateValues = {};
          if (values.username !== initialValues.username) {
            newValues.username = values.username;
          }
          if (values.fullName !== initialValues.fullName) {
            newValues.fullName = values.fullName;
          }
          if (newValues.fullName || newValues.username) {
            try {
              updated = await dispatch(
                updateOneUser({
                  username: values.username,
                  fullName: values.fullName,
                  id: loggedUser.id,
                })
              ).unwrap();
              dispatch(updateLoggedUser(updated));
            } catch (err) {
              console.log(err);
            }
          }
          if (
            values.password.length &&
            values.oldPassword.length &&
            values.passwordConfirm.length
          ) {
            try {
              await dispatch(
                updatePwd({
                  password: values.password,
                  passwordConfirm: values.passwordConfirm,
                  oldPassword: values.oldPassword,
                })
              );
            } catch (err) {
              console.log(err);
            }
          }
          actions.resetForm({
            values: { ...initialValues, ...updated },
          });
        } else {
          console.log(values);
          dispatch(signupUser(values));
        }
        actions.setSubmitting(false);
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
            <label htmlFor="fullName">Full Name</label>
            <Field type="text" name="fullName" />
            <StyledMessageCtn>
              <ErrorMessage name="fullName" />
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

          {loggedUser && (
            <StyledInnerDiv>
              <label htmlFor="oldPassword">Your Current Password</label>
              <Field
                name="oldPassword"
                type="password"
                placeholder="If you want to update it"
              />
              <StyledMessageCtn>
                <ErrorMessage name="oldPassword" />
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
            <label htmlFor="passwordConfirm">password confirmation</label>
            <Field name="passwordConfirm" type="password" />
            <StyledMessageCtn>
              <ErrorMessage name="passwordConfirm" />
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
