import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  password: Yup.string().required('Password is required!'),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  fullName: Yup.string()
    .trim()
    .min(3, 'Name is too short')
    .required('Name is required!'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .required(),
  passwordAgain: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const addProductSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required'),
  location: Yup.string()
    .trim()
    .required('Location is required'),
  description: Yup.string(),
  photos: Yup.array().max(6),
  price: Yup.number(),
});
