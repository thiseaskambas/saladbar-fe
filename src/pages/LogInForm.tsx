import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

import { RootState, useAppDispatch } from '../store/store';
import { logUserIn } from '../store/auth.slice';
import { useSelector } from 'react-redux';

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
    <main>
      <h1>Login</h1>
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
          <Form onSubmit={formik.handleSubmit}>
            {authState.status === 'failed' && <div>Error</div>}
            <label htmlFor="email">email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />

            <label htmlFor="password">password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />

            <label>
              <Field type="checkbox" name="rememberMe" />
              Remember me
            </label>

            <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
              Login now
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default LogInForm;
