import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

import { RootState, useAppDispatch } from '../store/store';
import { logUserIn } from '../store/auth.slice';
import { useSelector } from 'react-redux';
import {
  StyledForm,
  StyledImgCtn,
  StyledInnerDiv,
  StyledMain,
  StyledMessageCtn,
} from './styles/form.styles';
import { Link } from 'react-router-dom';

import images from '../assets';

interface IFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LogInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const initialValues: IFormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please fill in your email'),
    password: Yup.string().required('Please fill in your password'),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
    //   'Remember: your password contains letters and numbers and is at least 5 characters long'
    // ),
  });

  const fromUrl = location.state?.from?.pathname || '/dashboard';

  return (
    <StyledMain>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await dispatch(logUserIn(values)).unwrap();
            actions.resetForm({
              values: { email: '', password: '', rememberMe: false },
            });
            navigate(fromUrl, { replace: true });
            actions.setSubmitting(false);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(formik) => (
          <StyledForm onSubmit={formik.handleSubmit}>
            {authState.status === 'failed' && <div>Error</div>}
            <StyledImgCtn>
              <img src={images['logo.blue.XS.png']} alt="" />
            </StyledImgCtn>
            <StyledInnerDiv>
              <label htmlFor="email">email:</label>
              <Field type="email" name="email" />
              <StyledMessageCtn>
                <ErrorMessage name="email" />
              </StyledMessageCtn>
            </StyledInnerDiv>

            <StyledInnerDiv>
              <label htmlFor="password">password:</label>
              <Field name="password" type="password" />
              <StyledMessageCtn>
                <ErrorMessage name="password" />
              </StyledMessageCtn>
            </StyledInnerDiv>

            <StyledInnerDiv>
              <label>
                <Field type="checkbox" name="rememberMe" />
                Remember me
              </label>
            </StyledInnerDiv>

            <StyledInnerDiv>
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login now
              </button>
            </StyledInnerDiv>
            <StyledInnerDiv>
              Don&apos;t have an account ?<br />
              <Link to="/signup">Register here!</Link>
            </StyledInnerDiv>
          </StyledForm>
        )}
      </Formik>
    </StyledMain>
  );
};

export default LogInForm;
