import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required("Text is required"),
  title: Yup.string()
    .required("Title is requred"),
  description: Yup.string()
    .max(254, "Description is too long"),
  links: Yup.string()
    .max(254, "Links are too long"),
});

export default validationSchema;