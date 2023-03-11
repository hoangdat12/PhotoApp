import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import {FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/Ai'

import BannerLogin from '../assets/bannerLogin.mp4'
import { LoginWith } from './SignUp'
import { LogoPage } from '../components/layout/SiderBar'

export interface loginForm {
    email: string,
    password: string
}

const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const loginSchema = yup.object().shape({
        email: yup.string().email('Please enter a valid email').required('Email is required field'),
        password: yup.string().min(5).required('Password is required field')
    })

    const handleLogin = async (data: loginForm) => {
        const URL = 'http://localhost:8080/auth/login'
        const res = await axios.post(URL, data)
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', JSON.stringify(res.data.token))
            navigate('/')
        }
    }

    const {errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: handleLogin
    })

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={BannerLogin}
                    loop
                    muted
                    controls= {false}
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center bg-blackOverlay'>
                    <div className='relative h-[70px] w-full px-10 flex items-center justify-between mb-10'>
                        <LogoPage />
                        <div className=''>
                            <span className='text-[#9e9e9e] font-light mr-3 hidden lg:inline cursor-pointer'>Do not have account?</span>
                            <Link to='/sign-up'> 
                                <button className='hover:bg-[#d3d3d3] duration-300 text-black font-medium'>
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='sm:w-[600px] w-[90%] h-[80%] mx-auto rounded-xl bg-white px-8 py-12'>
                        <h1 className='sm:text-4xl text-2xl font-bold text-center'>Welcome back to Pexels</h1>
                        <div className='sm:mt-12 mt-6'>
                            <LoginWith className={'bg-[#4267b2]'} name={'Join with Facebook'} Icon={FaFacebook} />
                            <LoginWith className={'bg-[#111] mt-6'} name={'Join with Google'} Icon={FcGoogle} />
                        </div>
                        <h2 className='w-full text-center text-xl my-4 text-gray-blur'>Or</h2>
                        <form action="" onSubmit={handleSubmit} autoComplete='off'>
                            <input 
                                name='email'
                                className={`w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${errors.email && touched.email ? 'border-2 border-red-500' : ''}`}
                                type="text" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='username'
                                placeholder='Email'
                            />
                            {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                            <div className='relative sm:mt-8 mt-4'>
                                <input 
                                    name='password'
                                    className={`w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none ${errors.password && touched.password ? 'border-2 border-red-500' : ''}`}
                                    type={showPassword ? 'text' : 'password'} 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete='current-password'
                                    placeholder='Password'
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className='absolute right-3 cursor-pointer top-1/2 -translate-y-1/2'>
                                    {showPassword ? <AiOutlineEyeInvisible className='sm:text-xl'/> : <AiOutlineEye className='sm:text-xl'/>}
                                </span>
                            </div>
                            {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
                            <button type='submit' className='bg-amber-300 w-full rounded-lg text-white text-lg sm:mt-8 mt-6'>
                                Sign In
                            </button>
                            <h4 className='text-sm font-light text-gray-blur text-center sm:mt-8 mt-4 cursor-pointer'>Forget password?</h4>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn