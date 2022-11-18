import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledInnerDiv,
  StyledMain,
  StyledMessageCtn,
  StyledImgCtn,
} from './styles/form.styles';
import images from '../assets';

interface IFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp = () => {
  const initialValues: IFormValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please fill in your email'),
    password: Yup.string().required('Please fill in your password'),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
    //   'The password must contain letters and numbers and must be at least 5 characters long'
    // ),
    passwordConfirmation: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <StyledMain>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values, actions), actions.setSubmitting(false);
        }}
      >
        {(formik) => (
          <StyledForm onSubmit={formik.handleSubmit}>
            <StyledImgCtn>
              <img src={images['logo.blue.XS.png']} alt="" />
            </StyledImgCtn>
            <StyledInnerDiv>
              <label htmlFor="email">email</label>
              <Field type="email" name="email" />
              <StyledMessageCtn>
                <ErrorMessage name="email" />
              </StyledMessageCtn>
            </StyledInnerDiv>

            <StyledInnerDiv>
              <label htmlFor="password">password</label>
              <Field name="password" type="password" />
              <StyledMessageCtn>
                <ErrorMessage name="password" />
              </StyledMessageCtn>
            </StyledInnerDiv>

            <StyledInnerDiv>
              <label htmlFor="passwordConfirmation">
                password confirmation
              </label>
              <Field name="passwordConfirmation" type="password" />
              <StyledMessageCtn>
                <ErrorMessage name="passwordConfirmation" />
              </StyledMessageCtn>
            </StyledInnerDiv>

            <StyledInnerDiv>
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Sign-up now
              </button>
            </StyledInnerDiv>
          </StyledForm>
        )}
      </Formik>
    </StyledMain>
  );
};

export default SignUp;
