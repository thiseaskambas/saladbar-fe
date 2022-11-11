import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: IFormValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please fill in your email'),
    password: Yup.string()
      .required('Please fill in your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
        'Remember: your password contains letters and numbers and is at least 5 characters long'
      ),
  });

  return (
    <main>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          console.log(values, actions), actions.setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
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
