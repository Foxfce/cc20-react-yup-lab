import * as Yup from 'yup';

export const signupSchema = Yup.object({
  username: Yup.string()
  .matches(/^.[a-zA-Z]{5,12}$/g,'Need en char 5-12 character')
  // .min(3,({path,value,min})=>`${path} is too short >${min} : current  ${value.length}`)
  .required('Please insert your username'),
  nickname: Yup.string()
  .min(3,({path,value,min})=>`${path} is too short >${min} : current  ${value.length}`)
  .max(10,({path,value,max})=>`${path} is too long <${max} : current  ${value.length}`)
  .required('Please insert your nickname'),
  // password: Yup.string().min(6, 'Require at least 6 character').required('Please insert your password'),
  password: Yup.string().min(6,({path,value})=>`${path} Require at least 6 character current : ${value.length} char`).required('Please insert your password'),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")],'password is not matched'),
  term: Yup.boolean().oneOf([true], "Please accept the term"),
  age: Yup.number().typeError('Invalid form type')
  .min(10,({path,value})=>`${path} must more than 10 years old : current  ${value} years old`)
  .max(110,'You probably death mate')
  .required('Please insert your age'),
})