import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required("Text is required"),
  title: Yup.string()
    .required("Title is requred")
});

export default validationSchema;