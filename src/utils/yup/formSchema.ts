import * as yup from 'yup';

const maxFileSize = 800 * 1024;
const fileTypes = ['image/png', 'image/jpeg'];

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'The first letter must be capitalized')
    .required('Name is a required field'),
  age: yup
    .number()
    .typeError('Age is a required field')
    .min(0, 'Age must be positive number')
    .required('Age is a required field'),
  email: yup.string().email().required('Email is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be 6 or more characters')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least 1 number')
    .matches(/\W|_/, 'Password must contain at least 1 special character')
    .required('Password is required field'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
  gender: yup
    .string()
    .nonNullable()
    .typeError('Gender is required field')
    .strict(true)
    .required('Gender is a required field'),
  conditionsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  file: yup
    .mixed<FileList>()

    .test(
      'fileFormat',
      'Not valid file type',
      (value) => value?.[0] && fileTypes.includes(value[0].type)
    )
    .test(
      'fileSize',
      'Not valid file size',
      (value) => value?.[0] && value[0].size < maxFileSize
    )
    .test('required', 'File upload is required', (value) => !!value?.length),

  country: yup.string().required('Country is a required field'),
});
