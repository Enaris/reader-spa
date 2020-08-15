import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required("Text is required")
  
});

export default validationSchema;