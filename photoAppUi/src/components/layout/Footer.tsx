import React from 'react'

import {FaFacebook} from 'react-icons/fa'
import {AiOutlineMail, AiOutlineInstagram} from 'react-icons/Ai'

import { IPropsLayout } from './Layout'

export interface iPropsFooter {
    listItems: string[]
}

const frontEnd = [
    'React Js',
    'Tailwind Css',
    'Typescript',
    'Redux',
    'HTML, Css',
]

const backEnd = [
    'Node Js',
    'Java',
    'Django',
    'MongoDB',
    'PostgresSQL'
]

const usedFrontEnd = [
    'React Js',
    'Tailwind Css',
    'Typescript',
]

const useBackEnd = [
    'Node Js',
    'MongoDB',
    'Redis'
]

const Footer:React.FC<IPropsLayout> = ({open, setOpen, openMobile, setOpenMobile}) => {
    return (
        <footer  className= {`footer-1 relative text-white duration-300 bg-[#1f2937] shadow-header px-4 md:px-8 md:py-20 py-16 ${open ? 'lg:left-[18rem]' : 'lg:left-[5rem]'} ${open ? 'lg:w-header-open' : 'lg:w-header'} w-full`}>
            <div className="xl:px-4 px-2">
                <div className="grid xl:grid-cols-5 md:grid-cols-4 md:py-4 grid-cols-2 gap-2 sm:gap-0">
                    <div className="col-span-1 sm:mb-0 mb-6">
                        <h5 className="text-xl font-bold mb-6">Front End</h5>
                        <ListFooter listItems={frontEnd} />
                    </div>
                    <div className="col-span-1 sm:mb-0 mb-6">
                        <h5 className="text-xl font-bold mb-6">Back End</h5>
                        <ListFooter listItems={backEnd} />
                    </div>
                    <div className="col-span-1">
                        <h5 className="text-xl font-bold mb-6">Using FE</h5>
                        <ListFooter listItems={usedFrontEnd} />
                    </div>
                    <div className="col-span-1">
                        <h5 className="text-xl font-bold mb-6">Using BE</h5>
                        <ListFooter listItems={useBackEnd} />
                    </div>
                    <div className="xl:col-span-1 md:col-span-4 col-span-2 flex flex-col items-center">
                        <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">Stay connected</h5>
                        <div className="flex sm:justify-center xl:justify-start">
                            <a href="" className="p-[0.4rem] flex items-center justify-center border-2 border-gray-400 rounded-full text-center text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600">
                                <FaFacebook className='text-2xl'/>
                            </a>
                            <a href="" className="p-[0.4rem] mx-2 flex items-center justify-center border-2 border-gray-400 rounded-full text-center text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600">
                                <AiOutlineMail className='text-2xl'/>
                            </a>
                            <a href="" className="p-[0.4rem] flex items-center justify-center border-2 border-gray-400 rounded-full text-center text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600">
                                <AiOutlineInstagram className='text-2xl'/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t">
                    <div className="sm:w-full px-4 md:w-1/6">
                        <strong>FWR</strong>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                        <h6 className="font-bold mb-2">Address</h6>
                        <address className="not-italic mb-4 text-sm">
                        Long Ho Thuong<br />
                        Huong Ho, Tp Hue, Thua Thien Hue
                        </address>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                        <h6 className="font-bold mb-2">Contact</h6>
                        <p className="mb-1 text-sm">Phone Number: <strong className='cursor-pointer'>0334866296</strong>.<br /></p>
                        <p className="mb-4 text-sm">Email: <strong className='cursor-pointer'>tthoangdat18@gmail.com</strong>.<br /></p>
                    </div>
                    <div className="px-4 md:w-1/4 md:ml-auto mt-6 sm:mt-4 md:mt-0">
                        <button className="px-4 py-2 bg-amber-300 hover:bg-purple-900 rounded text-white">Contact Now</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const ListFooter:React.FC<iPropsFooter> = ({listItems}) => {
    return (
        <ul className="list-none footer-links">
            {
                listItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        <a href="#" className="border-b border-solid border-transparent hover:border-amber-300 hover:text-amber-300">{item}</a>
                    </li>
                ))
            }
        </ul>
    )
}

export default Footer