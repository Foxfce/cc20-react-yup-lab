import { useState } from 'react'
import { loginSchema } from '../schemas/loginScheme';
import { yupToFormError } from '../utils/yupToFormError';

export default function LoginForm() {
  const styles = {
    divInput: "flex gap-2",
    input: "border-1 rounded-lg",
    textError: "text-red-500 font-medium"
  }

  const [form, setForm] = useState({
    email: '',
    password: '',
    day: '',
    age: '',
  })

  const [errors, setErrors] = useState({});

  const hdlChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const hdlSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      await loginSchema.validate(form, { abortEarly: false })
      alert('Registered Successful!');
      setErrors({});
    } catch (err) {
      console.log(err);
      const errorObj = yupToFormError(err);
      setErrors(errorObj);
    }
  }
  return (
    <div className='flex flex-col w-1/1 h-dvh justify-center items-center'>
      <p className='font-bold text-3xl'>CC 20</p>
      <form className='flex flex-col w-max justify-center items-center gap-2'>
        <div className='flex flex-col w-max justify-center items-center'>
          <label htmlFor="email" className='self-start'>Email</label>
          <input type='email' name='email' value={form.email} onChange={hdlChange} placeholder='Input your email here' className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError}> {errors.email}</p>
        </div>
        <div className='flex flex-col w-max justify-center items-center gap-2r'>
          <label htmlFor='password' className='self-start'>Password</label>
          <input type='password' name='password' value={form.password} onChange={hdlChange} placeholder='Input your password here' className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError}> {errors.password}</p>
        </div>
        <div className='flex flex-col w-max justify-center items-center gap-2r'>
          <label htmlFor='day' className='self-start'>Day</label>
          <input type='number' name='day' value={form.day} onChange={hdlChange} placeholder='Input your day here' className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError}> {errors.day}</p>
        </div>
        <div className='flex flex-col w-max justify-center items-center gap-2r'>
          <label htmlFor='age' className='self-start'>Age</label>
          <input type='number' name='age' value={form.age} onChange={hdlChange} placeholder='Input your Age here' className='w-[300px] border border-gray-400 rounded-md pl-2 pr-4' />
          <p className={styles.textError}> {errors.age}</p>
        </div>
        <div>
          <button type='submit' onClick={(e) => hdlSubmit(e)} className='border py-1 px-4 bg-amber-200 border-amber-300 shadow-amber-100 shadow-xs'>Register</button>
        </div>
      </form>
    </div>
  )
}
