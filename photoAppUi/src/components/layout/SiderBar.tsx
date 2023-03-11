import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {WiAlien} from 'react-icons/wi'
import {BsSearch, BsChevronDown} from 'react-icons/bs'
import {RiCloseCircleLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/Ai'

import { IPropsLayout } from '../layout/Layout'
import Search from '../Search'
import { logoutUser } from '../../ultils/authUltils'
import { Menus, mobileMenu } from '../../ultils/arrPage'

const SiderBar:React.FC<IPropsLayout> = ({setOpen, open, openMobile, setOpenMobile, setProgress}) => {
    const navigate = useNavigate()
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const [disable, setDisable] = useState(false)
    const [timerId, setTimerId] = useState<number>()

    const handleNavigate = (link: string | undefined) => {
        if (!disable) {
            setDisable(true)
            const isValid = link === '/license' && open && !submenuOpen && openMobile === false
            if (isValid) {
                setSubmenuOpen(!submenuOpen)
                setDisable(false)
                return
            }
            if (setProgress) {
                setProgress(10)
                setProgress(30)
                setProgress(60)
                setProgress(100)
            }
            const timer = setTimeout(() => {
                if (link) navigate(link)
                setDisable(false)
            }, 400)
            setTimerId(timer)
        }
    } 

    useEffect(() => {
        return () => clearTimeout(timerId)
    }, [])
 
    return (
        <>
        <div className={`fixed left-0 top-0 bg-dark-purple h-screen p-5 pt-8 duration-300 hidden lg:block ${open ? 'w-72' : 'w-20'}`}>
            {/* <BsArrowRight onClick={handleOpenSiderBar} className={`absolute p-1 bg-white text-dark-purple text-3xl rounded-full -right-3 top-9 border border-dark-purple cursor-pointer ${open ? 'rotate-[180deg]' : ''}`}/> */}
            <div className={`inline-flex items-center justify-center`}>
                <span className='rounded-full bg-amber-300 cursor-pointer float-left mr-2'>
                    <WiAlien className='text-4xl'/>
                </span>
                <span className={`text-white text-2xl font-medium ${!open && 'scale-0 hidden'}`}>Special</span>
            </div>
            <div className={`flex items-center text-lg mt-6 py-2 rounded-md bg-light-white ${open ? 'px-4' : 'px-2.5'}`}>
                <BsSearch onClick={!open ? () => setOpen(true) : undefined} className={`text-white text-lg block float-left cursor-pointer ${open && 'mr-2'}`}/>
                <input type={'search'} placeholder={'Search...'} className={`text-base bg-transparent text-white focus:outline-none ${!open && 'hidden'}`}/>
            </div>
            <ul className='pt-2'>
                {
                    Menus.map((menu, idx) => (
                        <div onClick={() => handleNavigate(menu.path)} key={idx}>
                            <span className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 mt-2 hover:bg-light-white rounded-md ${menu.spacing && 'mt-9'}`}>
                                <span className='text-2xl float-left block'> <menu.Icon/></span>
                                <span className={`text-base font-medium ${!open && 'hidden'}`}>{menu.title}</span>
                                {
                                    menu.submenu && (
                                        <BsChevronDown className={`${!open && 'hidden'}`}/>
                                    )
                                }
                            </span>
                            {
                                menu.submenu && submenuOpen && (
                                    <ul>
                                        {
                                            menu.submenuItems.map((item, idx) => (
                                                <span onClick={() => handleNavigate(item.path)} key={idx} className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                                                    {item.title}
                                                </span>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </div>
                    ))
                }
                <li onClick={logoutUser} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 mt-2 hover:bg-light-white rounded-md`}>
                    <span className='text-2xl float-left block'><AiOutlineLogout /></span>
                    <span className={`text-base font-medium ${!open && 'hidden'}`}>Logout</span>
                </li>
            </ul>
        </div>
        <div className={`fixed model-animation top-0 left-0 bottom-0 right-0 bg-black text-white duration-300 lg:hidden pt-4 w-full md:w-[70%] h-screen ${openMobile ? 'block' : 'hidden overflow-y-scroll'} z-[100]`}>
            <div className='flex gap-2 sm:gap-4 items-center pb-6 border-b border-slate-200 px-4'>
                <LogoPage />
                <Search className={'text-black flex-1'}/>
                <RiCloseCircleLine onClick={() => setOpenMobile(false)} className='text-3xl cursor-pointer'/>
            </div>
            <ul className='pt-5'>
                {
                    mobileMenu.map((item, idx) => (
                        <li key={idx} className={`px-6 py-2 cursor-pointer hover:opacity-80 hover:tracking-wider text-xl hover:text-[1.3rem] ${item.spacing ? 'mb-5' : 'mb-0'}`}>
                            <a onClick={() => handleNavigate(item.path)} className='text-white font-semibold'>{item.title}</a>
                        </li>
                    ))
                }
                <li onClick={logoutUser} className={`px-6 py-2 cursor-pointer hover:opacity-80 hover:tracking-wider text-xl hover:text-[1.3rem]`}>
                    <a href="#" className='text-white font-semibold'>Logout</a>
                </li>
            </ul>
        </div>
        </>
    )
}

export const LogoPage = () => {
    return (
        <Link to='/'>
            <div className={`inline-flex items-center justify-center`}>
                <span className='rounded-full bg-amber-300 cursor-pointer float-left mr-2'>
                    <WiAlien className='text-4xl text-black'/>
                </span>
            </div>
        </Link>
    )
}

export default SiderBar