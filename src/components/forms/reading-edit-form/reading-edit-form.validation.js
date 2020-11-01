import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is requred"),
  text: Yup.string()
    .when("changeText", {
      is: true, 
      then: Yup.string()
        .required("Text is required")
    }),
  description: Yup.string()
    .max(254, "Description is too long"),
  links: Yup.string()
    .max(254, "Links are too long"),
    
});

export default validationSchema;