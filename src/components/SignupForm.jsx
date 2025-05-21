import { useState, useRef } from 'react';
// import { loginSchema } from '../schemas/loginScheme';
import { signupSchema } from '../schemas/signupScheme';
import { yupToFormError } from '../utils/yupToFormError';

export default function SignupForm() {
  const styles = {
    divInput: "flex gap-2",
    input: "border-1 rounded-lg",
    textError: "text-red-500 font-medium"
  }

  const [form, setForm] = useState({
    username: '', //username
    nickname: '',
    password: '',
    confirmPassword: '',
    term: false,
    age: '',
  })

  const refs = {
    username: useRef(null),
    nickname: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    term: useRef(null),
    age: useRef(null),
  }

  const [errors, setErrors] = useState({});


  const hdlChange = (e) => {
    if (e.target.name === 'term') {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return console.log(e.target.checked);
    }
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const hdlSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      await signupSchema.validate(form, { abortEarly: false })
      alert('Registered Successful!');
      setErrors({});
    } catch (err) {
      console.log(err);
      const errorObj = yupToFormError(err,refs);
      setErrors(errorObj);
    }
  }

  return (
    <div className='flex flex-col w-1/1 h-dvh justify-center items-center'>
      <p className='font-bold text-3xl'>Signup Form</p>
      <form className='flex flex-col w-max justify-center items-start gap-6'>
        <div className='flex flex-col w-max justify-center items-start relative'>
          <label htmlFor="username" className='self-start'>Username</label>
          <input type='username'
            ref={refs.username}
            name='username'
            value={form.username}
            onChange={hdlChange}
            placeholder='Input your username here'
            className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError + ' absolute top-13'}> {errors.username}</p>
        </div>
        <div className='flex flex-col w-max justify-center items-start relative'>
          <label htmlFor="nickname" className='self-start'>Nickname</label>
          <input type='nickname'
            name='nickname'
            ref={refs.nickname}
            value={form.nickname}
            onChange={hdlChange}
            placeholder='Input your nickname here'
            className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError + ' absolute top-13'}> {errors.nickname}</p>
        </div>
        <div className='flex flex-col w-max justify-center items-start relative'>
          <label htmlFor='password' className='self-start'>Password</label>
          <input type='password'
            name='password'
            ref={refs.password}
            value={form.password}
            onChange={hdlChange}
            placeholder='Input your password here'
            className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError + ' absolute top-13'}> {errors.password}</p>
        </div>
        <div className='flex flex-col w-max justify-center items-start relative'>
          <label htmlFor='confirmPassword' className='self-start'>Confirm Password</label>
          <input type='password'
            name='confirmPassword'
            ref={refs.confirmPassword}
            value={form.confirmPassword}
            onChange={hdlChange}
            placeholder='Input your password here'
            className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError + ' absolute top-13'}> {errors.confirmPassword}</p>
        </div>
        <div className='flex flex-col w-max justify-center items-start relative'>
          <label htmlFor='age' className='self-start'>Age</label>
          <input type='number'
            name='age'
            ref={refs.age}
            value={form.age}
            onChange={hdlChange}
            placeholder='Input your Age here'
            className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError + ' absolute top-13'}> {errors.age}</p>
        </div>
        <div className='flex flex-col w-max justify-start items-start relative'>
          <div>
            <input type='checkbox'
              name='term'
              ref={refs.term}
              onChange={hdlChange}
              className='self-start inline-block' />
            <label htmlFor='term' className='self-start inline-block'>Terms</label>
          </div>
          <p className={styles.textError + ' absolute top-6 text-nowrap'}> {errors.term}</p>
        </div>
        <div>
          <button type='submit' onClick={(e) => hdlSubmit(e)} className='border py-1 px-4 bg-amber-200 border-amber-300 shadow-amber-100 shadow-xs mt-4'>Register</button>
        </div>
      </form>
    </div>
  )
}
