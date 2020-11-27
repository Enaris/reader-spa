import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(12, "Passowrd cannot be longer than 12 characters")
    .required("Password is required"), 
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords does not match')
});

export default validationSchema;