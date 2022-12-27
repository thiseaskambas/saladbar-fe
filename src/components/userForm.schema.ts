import * as Yup from 'yup';

export const validationSchema = Yup.object().shape(
  {
    editing: Yup.boolean(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Please fill in your email'),
    username: Yup.string()
      .required('Please fill in your username')
      .matches(/^\S*$/, 'Usernames cannot contain spaces')
      .max(15, 'Maximum 15 characters')
      .min(5, 'Minimum 5 characters'),
    fullName: Yup.string()
      .max(20, 'Maximum 20 characters')
      .min(4, 'Minimum 4 characters'),
    oldPassword: Yup.lazy(() =>
      Yup.string()
        .notRequired()
        .when(['password', 'editing'], {
          is: (password: string, editing: boolean) =>
            password?.length && editing,
          then: Yup.string().required('Please enter your current password'),
        })
    ),
    password: Yup.lazy(() =>
      Yup.string()
        .notRequired()
        .when('passwordConfirm', {
          is: (value: string) => value?.length,
          then: Yup.string()
            .required('This field is required')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
              'The password must contain letters and numbers and must be at least 5 characters long'
            ),
        })
        .when('oldPassword', {
          is: (value: string) => value?.length,
          then: Yup.string()
            .required('This field is required')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
              'The password must contain letters and numbers and must be at least 5 characters long'
            ),
        })
        .when('editing', {
          is: false,
          then: Yup.string()
            .required('This field is required')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
              'The password must contain letters and numbers and must be at least 5 characters long'
            ),
        })
    ),

    passwordConfirm: Yup.lazy(() =>
      Yup.string()
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
        })
    ),
  },

  [
    ['passwordConfirm', 'password'],
    ['oldPassword', 'passwordConfirm'],
  ]
);
