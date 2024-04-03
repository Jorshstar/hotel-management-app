'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from 'next-auth-sanity/client';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const defaultFormData = {
  name: '',
  username: '',
  phonenumber: '',
  email: '',
  password: '',
  confirmpassword: ''
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyles =
    'border border-tertiary-dark sm:text-sm text-white placeholder-white rounded-lg block w-full p-2.5 focus:outline-none bg-transparent';

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (session) router.push('/');
    }, [router, session]);

    const loginHandler = async () => {
      try {
        await signIn();
        router.push('/');
      } catch (error) {
        console.log(error);
        toast.error("Something wen't wrong");
      }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        const user = await signUp(formData);
        if (user) {
          toast.success('Success. Please sign in.');
          // Optionally, you can automatically sign in the user after signing up
          await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false // Prevent automatic redirection
          });
          router.push('/'); // Redirect after sign-in
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setFormData(defaultFormData);
      }
    };
  
    // Render sign-up form only if there's no active session
    if (session) {
      return <p className='text-white'>Your are already logged in.</p>;
    }

  return (
    <section className="container mx-auto bg-cover bg-center bg-fixed " style={{
      backgroundImage: "url('/images/hotelmain1.jpg')",
      backgroundSize: "cover", // or "contain" if you prefer
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      animation: "img scaleAnimation",

      } }>
      <div className="p-6 space-y-4  md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className='flex mb-8 flex-col md:flex-row items-center justify-between'>
          <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white'>Create an account</h1>
          <p className='text-white'>OR</p>
          <span className='inline-flex items-center'>
            <AiFillGithub
              onClick={loginHandler}
              className='mr-3 text-4xl cursor-pointer text-white dark:text-white'
            />{' '}
            |
            <FcGoogle
              onClick={loginHandler}
              className='ml-3 text-4xl cursor-pointer'
            />
          </span>
        </div>

        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
          <input 
            type="text"
            name='name'
            placeholder='name'
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input 
            type="text"
            name='username'
            placeholder='username'
            required
            className={inputStyles}
            value={formData.username}
            onChange={handleInputChange}
          />
          <input 
            type="tel"
            name='phonenumber'
            placeholder='000-000-000'
            required
            className={inputStyles}
            value={formData.phonenumber}
            onChange={handleInputChange}
          />
          <input 
            type="email"
            name='email'
            placeholder='joshua@hotel.com'
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input 
            type="password"
            name='password'
            placeholder='password'
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />
          <input 
            type="password"
            name='confirmpassword'
            placeholder='confirm password'
            required
            minLength={6}
            className={inputStyles}
            value={formData.confirmpassword}
            onChange={handleInputChange}
          />
          <button type='submit' className='w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white'>
          signup
        </button>
      </form>

      <p className='text-white'>Already have an account? <button onClick={loginHandler} className='underline'>login</button></p>
      </div>
    </section>
  )
}

export default Auth