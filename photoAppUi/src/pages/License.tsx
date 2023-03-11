import React from 'react'

import {GiCheckMark} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/Ai'

import Layout from '../components/layout/Layout'

const License = () => {
    return (
        <Layout>
            <div className='xl:container px-4 mx-auto xl:px-6 sm:px-6 md:px-12 w-full h-full py-10'>
                <h1 className='text-center'>Legal Simplicity</h1>
                <div className='hidden md:flex flex-col text-xl items-center justify-center mt-8 font-semibold'>
                    <p>All photos and videos on Pexels can be</p>
                    <p>downloaded and used for free.</p>
                </div>
                <div className='flex md:hidden flex-col text-xl items-center justify-center mt-8 font-semibold'>
                    <p className='text-center'>All photos and videos on Pexels can be downloaded and used for free.</p>
                </div>

                <div className=''>
                    <div className='flex items-center justify-center gap-2 text-3xl font-semibold mt-16'>
                        <h2>What is allowed?</h2>
                        <span>👌</span>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <LicenseAllowed />
                        <LicenseAllowed />
                        <LicenseAllowed />
                        <LicenseAllowed />
                    </div> 
                </div>
                <div>
                    <div className='flex items-center justify-center gap-2 text-3xl font-semibold mt-16'>
                        <h2>What is not allowed?</h2>
                        <span>👎</span>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <LicenseNotAllowed />
                        <LicenseNotAllowed />
                        <LicenseNotAllowed />
                        <LicenseNotAllowed />
                    </div> 
                </div>
            </div>
            <div className='bg-[#f1f3f4] py-16 px-4 md:px-0'>
                <h1 className='text-center'>Legal Simplicity</h1>
                <div className='hidden md:flex flex-col text-xl items-center justify-center mt-8 font-semibold'>
                    <p>All photos and videos on Pexels can be</p>
                    <p>downloaded and used for free.</p>
                </div>
                <div className='flex md:hidden flex-col text-xl items-center justify-center mt-8 font-semibold'>
                    <p className='text-center'>All photos and videos on Pexels can be downloaded and used for free.</p>
                </div>

                <div className='rounded-2xl overflow-hidden mt-10 md:mx-10'>
                    <div className='grid grid-cols-2 rounded-2xl xl:rounded-none overflow-hidden'>
                        <div className='xl:col-span-1 col-span-2 cursor-pointer'>
                            <img className='w-full' src="https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg?w=600&h=500&dpr=1" alt="" />
                        </div>
                        <div className='flex flex-col items-center justify-center xl:col-span-1 col-span-2 bg-white'>
                        <div className='xl:w-[70%] py-10 px-3'>
                                <h1 className='text-3xl sm:text-[2.1rem] font-semibold text-center'>On your website, blog or app</h1>
                                <p className='mt-3 text-center text-lg sm:text-xl font-medium'>Use the photos and videos online – whether it’s a website, e-commerce shop, newsletter, e-book, presentation, blog or a template you sell.</p>
                        </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 rounded-2xl xl:rounded-none overflow-hidden mt-10 xl:mt-0'>
                        <div className='flex order-2 xl:order-0 flex-col items-center justify-center xl:col-span-1 col-span-2 bg-white'>
                            <div className='xl:w-[70%] py-10 px-3'>
                                    <h1 className='text-3xl sm:text-[2.1rem] font-semibold text-center'>Promote your product</h1>
                                    <p className='mt-3 text-center text-lg sm:text-xl font-medium'>Create unique ads, banners and marketing campaigns with photos from Pexels and promote your product.</p>
                            </div>
                        </div>
                        <div className='xl:col-span-1 order-1 xl:order-0 col-span-2 cursor-pointer'>
                            <img className='w-full' src="https://images.pexels.com/photos/5462207/pexels-photo-5462207.jpeg?w=600&h=500&dpr=1" alt="" />
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-2 rounded-2xl xl:rounded-none overflow-hidden mt-10 xl:mt-0'>
                        <div className='xl:col-span-1 col-span-2 cursor-pointer'>
                            <img className='w-full' src="https://images.pexels.com/photos/8131585/pexels-photo-8131585.jpeg?w=600&h=500&dpr=1" alt="" />
                        </div>
                        <div className='flex flex-col items-center justify-center xl:col-span-1 col-span-2 bg-white'>
                        <div className='xl:w-[70%] py-10 px-3'>
                                <h1 className='text-3xl sm:text-[2.1rem] font-semibold text-center'>Print marketing material</h1>
                                <p className='mt-3 text-center text-lg sm:text-xl font-medium'>Use the photos for flyers, postcards, invitations, magazines, albums, books, CD covers and more.</p>
                        </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 rounded-2xl xl:rounded-none overflow-hidden mt-10 xl:mt-0'>
                        <div className='flex order-2 xl:order-0 flex-col items-center justify-center xl:col-span-1 col-span-2 bg-white'>
                            <div className='xl:w-[70%] py-10 px-3'>
                                    <h1 className='text-3xl sm:text-[2.1rem] font-semibold text-center'>Share them on social media</h1>
                                    <p className='mt-3 text-center text-lg sm:text-xl font-medium'>Grow your audience by posting authentic and engaging photos and videos on social media like Facebook, Instagram or YouTube.</p>
                            </div>
                        </div>
                        <div className='xl:col-span-1 order-1 xl:order-0 col-span-2 cursor-pointer'>
                            <img className='w-full' src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?w=600&h=500&fit=crop&dpr=1" alt="" />
                        </div>
                    </div>
                </div>

                <div className='flex sm:w-[80%] sm:mx-auto xl:flex-row gap-4 flex-col xl:justify-center mt-10'>
                    <button className='text-white bg-amber-300 px-8 py-2'>Upload Your Own Photos</button>
                    <button className='px-8 py-2'>Upload Your Own Photos</button>
                </div>
            </div>
        </Layout>
    )
}

export const LicenseAllowed = () => {
    return (
        <div className='flex items-center px-4 md:px-0 justify-center cursor-pointer mt-6 w-full md:w-[740px] rounded-2xl text-xl gap-2 font-medium md:font-semibold py-3 border border-[#ccc]'>
            <span className='text-amber-300'><GiCheckMark /></span>
            <span>All photos and videos on Pexels are free to use.</span>
        </div>
    )
}

export const LicenseNotAllowed = () => {
    return (
        <div className='flex items-center px-4 md:px-0 justify-center cursor-pointer mt-6 w-full md:w-[740px] rounded-2xl text-xl gap-2 font-medium md:font-semibold py-3 border border-[#ccc]'>
            <span className='text-red-500'><AiOutlineClose className='text-red-500'/></span>
            <span>All photos and videos on Pexels are free to use.</span>
        </div>
    )
}

export default License