import React, { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as yup from 'yup';
import { useFormik, Formik, Form, Field, FormikProps } from 'formik';
import Dropzone from 'react-dropzone';

import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { HiUpload } from 'react-icons/hi';

import { LogoPage } from '../components/layout/SiderBar';
import Banner from '../assets/banner.png';
import axios from 'axios';

export interface iPropsButton {
  className?: string;
  Icon: React.ElementType;
  name: string;
}

export interface formRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  location: string;
  occupation: string;
}

const Signup = () => {
  return (
    <div className='w-full px-0'>
      <div className='fixed top-0 left-0 w-full bg-white z-50 flex justify-center items-center min-h-[70px] py-2 border-b border-slate-300'>
        <div className='flex items-center cursor-pointer'>
          <LogoPage />
          <Link to='/'>
            <span className='text-xl font-semibold ml-1 text-black'>
              Special
            </span>
          </Link>
        </div>
        <div className='absolute right-4 top-3'>
          <span className='text-[#9e9e9e] font-light mr-3 hidden lg:inline cursor-pointer'>
            You already have account?
          </span>
          <Link to='/sign-in'>
            <button className='hover:bg-[#d3d3d3] duration-300 text-black font-medium'>
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Purpose />} />
        <Route path='/join' element={<JoinCommunity />} />
        <Route path='/verify' element={<VerifyAccount />} />
      </Routes>
    </div>
  );
};

export const JoinCommunity = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File>();

  const registerSchema = yup.object().shape({
    firstName: yup.string().required('FirstName is required field!'),
    lastName: yup.string().required('LastName is required field!'),
    email: yup.string().email().required('FirstName is required field!'),
    password: yup
      .string()
      .min(6, 'Password too short!')
      .required('Password is required field!'),
    rePassword: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required(`Password confirm don't match with password!`),
    location: yup.string().required('Location is required field!'),
    occupation: yup.string().required('Occupation is required field!'),
  });

  const handleRegister = async (data: formRegister) => {
    const URL = 'http://localhost:8080/auth/register';
    const res = await axios.post(URL, data);
    if (res.status === 201) {
      navigate('/sign-up/verify', { state: { email: data.email, file: file } });
    }
  };

  const initialVlaue = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    location: '',
    occupation: '',
  };

  const { errors, touched, handleChange, handleBlur, handleSubmit } = useFormik(
    {
      initialValues: initialVlaue,
      validationSchema: registerSchema,
      onSubmit: handleRegister,
    }
  );

  return (
    <div className='grid grid-cols-2 lg:h-screen'>
      <div className='col-span-2 lg:col-span-1 flex justify-center min-h-screen pt-32 px-6 lg:overflow-y-scroll'>
        <div className='w-[500px]'>
          <h1 className='text-4xl font-bold text-center'>
            Join Community with 12 minion other People
          </h1>
          <h2 className='text-xl font-light text-center mt-4 text-[#1a1a1a] opacity-80'>
            Download free photos and videos provided by a community of
            photographers.
          </h2>

          <div className='mt-8'>
            <LoginWith
              className={'bg-[#4267b2]'}
              name={'Join with Facebook'}
              Icon={FaFacebook}
            />
            <LoginWith
              className={'bg-[#111] mt-6'}
              name={'Join with Google'}
              Icon={FcGoogle}
            />
          </div>
          <h2 className='w-full text-center text-xl my-4 text-gray-blur'>Or</h2>
          {/* <Formik
                        initialValues={initialVlaue}
                        validationSchema={registerSchema}
                        onSubmit={(values, actions) => {
                            handleSubmit()
                        }}
                    >
                       {(props: FormikProps<any>) => (
                            <Form>
                                <Field as="select" name="color">
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                </Field>
                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik> */}
          <form onSubmit={handleSubmit}>
            <div className='flex gap-[2%] justify-center'>
              <div className='my-8 w-[49%]'>
                <input
                  name='firstName'
                  className={`w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${
                    errors.firstName && touched.firstName
                      ? 'border-2 border-red-500'
                      : ''
                  }`}
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='firstName'
                  placeholder='FirstName'
                />
                {errors.firstName && touched.firstName && (
                  <p className='text-red-500'>{errors.firstName}</p>
                )}
              </div>

              <div className='my-8 w-[49%]'>
                <input
                  name='lastName'
                  className={`w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${
                    errors.lastName && touched.lastName
                      ? 'border-2 border-red-500'
                      : ''
                  }`}
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='lastName'
                  placeholder='LastName'
                />
                {errors.lastName && touched.lastName && (
                  <p className='text-red-500'>{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <input
                name='email'
                className={`w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${
                  errors.email && touched.email ? 'border-2 border-red-500' : ''
                }`}
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Email'
              />
              {errors.email && touched.email && (
                <p className='text-red-500'>{errors.email}</p>
              )}
            </div>

            <div>
              <input
                name='password'
                className={`w-full mt-8 px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${
                  errors.password && touched.password
                    ? 'border-2 border-red-500'
                    : ''
                }`}
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='new-password'
                placeholder='Password'
              />
              {errors.password && touched.password && (
                <p className='text-red-500'>{errors.password}</p>
              )}
            </div>

            <div>
              <input
                name='rePassword'
                className={`w-full mt-8 px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${
                  errors.rePassword && touched.rePassword
                    ? 'border-2 border-red-500'
                    : ''
                }`}
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete=''
                placeholder='Comfirm Password'
              />
              {errors.rePassword && touched.rePassword && (
                <p className='text-red-500'>{errors.rePassword}</p>
              )}
            </div>

            <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    className='w-full mt-8 px-4 py-3 cursor-pointer bg-[#f1f1f1] rounded-lg outline-none '
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className='flex gap-2 items-center'>
                      {file ? (
                        <>
                          <p>{file?.name}</p>
                          <span className='border border-slate-400 rounded-md px-2 py-1 hover:bg-slate-400 hover:text-white'>
                            Change
                          </span>
                        </>
                      ) : (
                        <>
                          <p>Choose file to make Avatar</p>
                          <HiUpload />
                        </>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>

            <div className='flex gap-[2%] justify-center'>
              <div className='w-[49%] my-8 '>
                <input
                  name='location'
                  className={`w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${
                    errors.location && touched.location
                      ? 'border-2 border-red-500'
                      : ''
                  }`}
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='location'
                  placeholder='Location'
                />
                {errors.location && touched.location && (
                  <p className='text-red-500'>{errors.location}</p>
                )}
              </div>

              <div className='w-[49%] my-8 '>
                <input
                  name='occupation'
                  className={`w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${
                    errors.occupation && touched.occupation
                      ? 'border-2 border-red-500'
                      : ''
                  }`}
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='occupation'
                  placeholder='Occupation'
                />
                {errors.occupation && touched.occupation && (
                  <p className='text-red-500'>{errors.occupation}</p>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='w-full bg-amber-300 mt-3 text-white font-medium'
            >
              Create Account
            </button>
          </form>
          <div className='mt-4 pb-10'>
            <p className='text-center text-gray-blur mb-6'>
              Tham gia nghĩa là bạn đồng ý với{' '}
              <Link to='#' className='text-blue-500'>
                Điều khoản dịch vụ và Chính sách bảo mật
              </Link>{' '}
              của chúng tôi
            </p>
          </div>
        </div>
      </div>
      <div className='col-span-2 lg:col-span-1 pt-[50px] lg:pt-[70px]'>
        <img src={Banner} alt='' />
      </div>
    </div>
  );
};

export const Purpose = () => {
  const navigate = useNavigate();

  const [activeSelect, setActiveSelect] = useState(false);

  const handleNavigate = () => {
    navigate('/sign-up/join');
  };

  return (
    <>
      <div className='mt-32 lg:mt-[8.5rem] flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold text-black tracking-wide text-center'>
          What's your purpose
        </h1>
        <div className='mt-10 hidden lg:block'>
          <div className='flex gap-4'>
            <div className='flex items-center flex-col w-[28rem] p-2 border-image'>
              <Link to='/sign-up/join'>
                <img
                  className='w-full rounded-lg cursor-pointer'
                  src='https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  alt=''
                />
              </Link>
              <p className='py-8 text-center text-xl px-10 opacity-80 text-[#1a1a1a] font-normal'>
                I want to download pictures and videos for free.
              </p>
              <button
                onClick={handleNavigate}
                className='w-[90%] bg-amber-300 text-white font-medium mb-4'
              >
                I want download
              </button>
            </div>
            <div className='flex items-center flex-col w-[28rem] p-2 border-image'>
              <Link to='sign-up/join'>
                <img
                  className='w-full rounded-lg  cursor-pointer'
                  src='https://images.pexels.com/photos/1500590/pexels-photo-1500590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  alt=''
                />
              </Link>
              <p className='py-8 text-center text-xl px-10 opacity-80 text-[#1a1a1a] font-normal'>
                I want to share my photos and videos with the world.
              </p>
              <button
                onClick={handleNavigate}
                className='w-[90%] bg-amber-300 text-white font-medium mb-4'
              >
                I want share
              </button>
            </div>
          </div>
          <div className='w-[600px] mx-auto mt-10 text-[#9e9e9e]'>
            <p className='text-center text-lg'>
              We will use this information to tailor the experience to you
              personally. You'll always be able to download and upload photos
              and videos, no matter which option you choose.
            </p>
          </div>
        </div>
      </div>
      <div className='lg:hidden w-[100%] px-4 sm:px-0 sm:w-[400px] mx-auto mt-16'>
        <div className='flex items-center p-4 rounded-lg bg-[#f1f1f1]'>
          <span
            onClick={() => setActiveSelect(false)}
            className='flex items-center justify-center min-w-[35px] h-[35px] rounded-full border-[3px] border-amber-300 cursor-pointer'
          >
            <span
              className={`w-[20px] h-[20px] bg-amber-300 rounded-full ${
                activeSelect && 'hidden'
              }`}
            ></span>
          </span>
          <div className='ml-4'>
            <h3 className='text-2xl font-semibold mb-1 '>DownLoad</h3>
            <p className='text-[1.1rem] font-medium'>
              I want to download pictures and video for free
            </p>
          </div>
        </div>
        <div className='flex items-center p-4 rounded-lg bg-[#f1f1f1] mt-5'>
          <span
            onClick={() => setActiveSelect(true)}
            className='flex items-center justify-center min-w-[35px] h-[35px] rounded-full border-[3px] border-amber-300 cursor-pointer'
          >
            <span
              className={`w-[20px] h-[20px] bg-amber-300 rounded-full ${
                !activeSelect && 'hidden'
              }`}
            ></span>
          </span>
          <div className='ml-4'>
            <h3 className='text-2xl font-semibold mb-1 '>DownLoad</h3>
            <p className='text-[1.1rem] font-medium'>
              I want to download pictures and video for free
            </p>
          </div>
        </div>
        <button className='mt-16 w-full rounded-lg font-medium text-white bg-amber-300'>
          Select
        </button>
        <div className='mt-6'>
          <p className='text-center text-[#9e9e9e] text-lg font-light'>
            Bạn có thể tải xuống cũng như tải lên ảnh và video, bất kể bạn chọn
            tùy chọn nào.
          </p>
        </div>
      </div>
    </>
  );
};

export const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleVerify = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const otpArr = [
      formData.get('ip1'),
      formData.get('ip2'),
      formData.get('ip3'),
      formData.get('ip4'),
      formData.get('ip5'),
      formData.get('ip6'),
    ];
    let otp = otpArr.join('');
    console.log(otp);
    const formDataUpload = new FormData();
    formDataUpload.append('email', location.state.email);
    formDataUpload.append('picture', location.state?.file);
    formDataUpload.append(
      'pictureName',
      location.state?.file?.name || 'defaultAvatar.png'
    );
    formDataUpload.append('otp', otp);

    const URL = 'http://localhost:8080/auth/verify';
    const res = await axios.post(URL, formDataUpload);

    if (res.status === 201) {
      localStorage.setItem('token', JSON.stringify(res.data.token));
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    }
  };
  const inputClass =
    'w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] border-2 border-amber-500 outline-none text-center text-2xl';
  return (
    <div className='mt-32 lg:mt-[8.5rem] flex flex-col items-center justify-center'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-wide text-center'>
        Verfify Your Account
      </h1>
      <form onSubmit={handleVerify}>
        <div className='flex items-center justify-center gap-2 sm:gap-6 md:gap-10 mt-8 sm:mt-14 md:mt-20'>
          <input name='ip1' className={inputClass} />
          <input name='ip2' className={inputClass} />
          <input name='ip3' className={inputClass} />
          <input name='ip4' className={inputClass} />
          <input name='ip5' className={inputClass} />
          <input name='ip6' className={inputClass} />
        </div>
        <div className='mt-12 flex justify-center'>
          <button
            type='submit'
            className='text-white text-xl bg-amber-300 px-12'
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export const LoginWith: React.FC<iPropsButton> = ({
  className,
  name,
  Icon,
}) => {
  return (
    <button
      className={`flex items-center justify-between w-full text-white ${className}`}
    >
      <Icon className='text-2xl' />
      <span className='text-lg font-semibold'>{name}</span>
      <span></span>
    </button>
  );
};

export default Signup;
