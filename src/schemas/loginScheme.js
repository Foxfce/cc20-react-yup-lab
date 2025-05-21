import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email form').required('Please insert your email'),
  // password: Yup.string().min(6, 'Require at least 6 character').required('Please insert your password'),
  password: Yup.string().min(6,({path,value})=>`${path} Require at least 6 character current : ${value.length} char`).required('Please insert your password'),
  day: Yup.number().typeError('Invalid form type')
  .min(1,({path,value})=>`${path} must be between 1-31 : current ${value}`)
  .max(31,({path,value})=>`${path} must be between 1-31 : current ${value}`)
  .required('Please insert your day'),
  age: Yup.number().typeError('Invalid form type')
  .min(10,({path,value})=>`${path} must more than 10 years old : current  ${value} years old`)
  .max(110,'You probably death mate')
  .required('Please insert your age'),
})