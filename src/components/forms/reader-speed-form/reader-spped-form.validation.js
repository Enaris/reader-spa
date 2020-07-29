import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  speed: Yup.number()
    .min(1, "Speed cannot be lower.")
    .max(60000, "Reader cannot go faster.")
    .required("Speed is required"),
  targetSpeed: Yup.number() 
    .when("doAccelerateIni", {
      is: true, 
      then: Yup.number()
        .min(0, "Speed cannot be lower.")
        .max(60000, "Reader cannot go faster.")
    }),
  accelerationTime: Yup.number()
    .when("doAccelerateIni", {
      is: true, 
      then: Yup.number()
        .min(1, "Time cannot be lower.")
        .max(300, "Time cannot be higher.")
    }),
  accelerationConstant: Yup.number() 
    .when("doAccelerateConst", {
      is: true, 
      then: Yup.number()
        .min(1, "Acceleration cannot be lower.")
        .max(100, "Acceleration cannot be faster.")
    }),
  longerThan: Yup.number() 
    .when("actIfLonger", {
      is: true, 
      then: Yup.number()
        .min(5, "Word must be longer."),
    }),
  slowTo: Yup.number()
    .when("actionIfLonger", {
      is: 'slow', 
      then: Yup.number()
        .min(1, "Speed cannot be lower.")
        .max(60000, "Reader cannot go faster.")
    }),
  appendIfShorter: Yup.number()
    .when("actionIfLonger", {
      is: 'break', 
      then: Yup.number()
        .min(1, "Shorter words does not exist")
        .max(3, "Cannot append longer words.")
    }),
  maxAppend: Yup.number()
    .when("doAppendWords", {
      is: true, 
      then: Yup.number()
        .min(1, "Max cannot be less than 1")
        .max(2, "Cannot append more words")
    })
});

export default validationSchema;