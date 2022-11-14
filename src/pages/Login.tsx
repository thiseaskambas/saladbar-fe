import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch } from '../store/store';
import { logUserIn } from '../store/auth.slice';
import { useSelector } from 'react-redux';

interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const initialValues: IFormValues = {
    email: '',
    password: '',
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

  return (
    <main>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await dispatch(logUserIn(values)).unwrap();
            actions.resetForm({ values: { email: '', password: '' } });
            navigate('/dashboard');
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

            <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
              Login now
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Login;
