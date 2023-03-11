import React from 'react'

import {BsSearch} from 'react-icons/bs'

import Layout from '../components/layout/Layout'
import Input, {InputLabel, TextareLabel, FileLabel} from '../components/Input'

const Contact = () => {
    return (
        <Layout>
            <div className='xl:container px-2 mx-auto xl:px-10 sm:px-6 md:px-12 w-full h-full py-10'>
                <div className='flex justify-between flex-col md:flex-row'>
                        <div className='flex gap-2'>
                            <span>Pexels</span>
                            <span>{`${'>'}`}</span>
                            <span>Submit a request</span>
                        </div>
                        <div className='rounded-xl mt-4 md:mt-0 flex gap-2 items-center px-4 py-2 border border-[#777] min-w-[300px]'>
                            <BsSearch className='text-lg text-[#777]'/>
                            <input type={"search"} className='flex-1 border-none outline-none' placeholder='Search...'/>
                        </div>
                    </div>
                <div className='mt-10'>
                    <h2 className='text-3xl font-semibold'>Submit a request</h2>
                    <div className='mt-5'>
                        <InputLabel className='w-full md:w-[60%]' label={'Your email address'}/>
                        <InputLabel className='w-full md:w-[60%] mt-6' label={'Subject'}/>
                        <TextareLabel className='w-full md:w-[60%] mt-6' label={'Description'}/>
                        <p className='text-xs'>Please enter the details of your request. A member of our support staff will respond as soon as possible</p>
                        <FileLabel className='mt-5 w-full md:w-[60%]' label='Attachments'/>
                    </div>
                    <div className='mt-6'>
                        <button className='px-0 w-full md:px-16 py-2 font-lg bg-amber-300 text-white'>Submit</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact