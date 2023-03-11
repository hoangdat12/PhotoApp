import React, {useState, useRef, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {AiOutlineMenu} from 'react-icons/Ai'
import {WiAlien} from 'react-icons/wi'
import {BsSearch, BsPersonCircle} from 'react-icons/bs'
import { getUserFromLocalStorage } from '../../ultils/authUltils'

import { IPropsLayout } from './Layout'
import { logoutUser } from '../../ultils/authUltils'
import { Avatar } from '../Picture'
import useDebounce from '../../hook/useDebounce'
import { iImageData } from '../Picture'
import axios from 'axios'

export interface iDataSearchName {
    picture: iImageData,
    handleNavigateSearch: (value:string) => void
}

export interface iDataSearchUser {
    _id: string,
    fisrtName: string,
    lastName: string,
    nickName: string,
    avatarUrl: string,
    occupation: string
}

export interface iPropsAccount {
    user: iDataSearchUser,
    handleNavigateSearch: (value: string) => void
}

const Header:React.FC<IPropsLayout> = ({open, setOpen, openMobile, setOpenMobile, setProgress}) => {
    const navigate = useNavigate()
    const user = getUserFromLocalStorage()

    const personRef = useRef<HTMLDivElement>(null)

    const [show, setShow] = useState(false)
    const [disable, setDisable] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState<iImageData[]>([])
    const [searchUserValue, setSearchUserValue] = useState<iDataSearchUser[]>([])
    const [timerId, setTimerId] = useState<number>()

    const debounce = useDebounce(searchValue)

    useEffect(() => {
        if (searchValue !== '') {
            const keyEnter = (e:any) => {
                if (e.keyCode === 13) {
                    navigate(`/result?search=${searchValue}`, {state: searchValue})
                    setSearchValue('')
                }
            }

            document.addEventListener('keydown', keyEnter)

            return () => {
                document.removeEventListener('keydown', keyEnter)
            }
        }
    })

    useEffect(() => {
        const checkClickOutside = (e:any) => {
            if (show && personRef.current && !personRef.current.contains(e.target)) {
                console.log('render')
                setShow(false)
            }
        }

        document.addEventListener('mousedown', checkClickOutside)

        return () => {
            document.removeEventListener('mousedown', checkClickOutside)
        }
    }, [show])

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([])
            setSearchUserValue([])
            return
        }

        const handleSearchNameImage = async () => {
            const URL = `http://localhost:8080/picture/list?search=${debounce}&limit=5`
            const res = await axios.get(URL)

            if (res.status === 200) {
                setSearchResult(res.data.result)
            }
        }

        const handleSearchUser = async () => {
            const URL = `http://localhost:8080/user/list?search=${debounce}&limit=5`
            const res = await axios.get(URL)
            if (res.status === 200) {
                setSearchUserValue(res.data.result)
            }
        }

        handleSearchNameImage()
        handleSearchUser()
    }, [debounce])

    const handleNavigate = (link: string) => {
        if (!disable) {
            setDisable(true)
            if (setProgress) {
                setProgress(10)
                setProgress(30)
                setProgress(50)
                setProgress(100)
            }
            const timer = setTimeout(() => {
                navigate(link)
                setDisable(false)
            }, 400)
            setTimerId(timer)
        }
    }

    useEffect(() => {
        return () => clearTimeout(timerId)
    }, [])


    const handleNavigateSearch = (link: string) => {
        navigate(link)
        setSearchValue('')
    }

    const handleNavigatePage = (link:string) => {
        navigate(link)
        setShow(false)
    }

    return (
        <div className={`fixed px-4 min-h-[70px] w-full duration-300 bg-white top-0 gap-3 sm:gap-4 shadow-header flex items-center md:justify-between md:px-8 ${open ? 'lg:left-[18rem]' : 'lg:left-[5rem]'} md:gap-0 sm:min-h-[80px] ${open ? 'lg:w-header-open' : 'lg:w-header'} z-50`}>
            <div className='flex items-center sm:gap-4'>
                <div onClick={() => setOpen(!open)} className='text-2xl cursor-pointer hidden lg:block'>
                    <AiOutlineMenu />
                </div>
                <div onClick={() => setOpenMobile(!openMobile)} className='text-2xl cursor-pointer block lg:hidden'>
                    <AiOutlineMenu />
                </div>
                <Link to='/'>
                    <div className='hidden md:flex items-center justify-center text-black'>
                        <span className='rounded-full bg-amber-300 cursor-pointer float-left mr-2 xl:block hidden'>
                            <WiAlien className='text-4xl'/>
                        </span>
                        <span className={`font-medium text-2xl`}>Special</span>
                    </div>
                </Link>
            </div>
            
            <div className='relative flex items-center px-4 sm:px-6 min-h-[40px] sm:mx-8 lg:mx-10 xl:mx-16 flex-1 sm:min-h-[50px] bg-[#f7f7f7] rounded-lg'>
                <input 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type={'search'} 
                    className='sm:flex-1 sm:pr-3 bg-transparent focus:outline-none' 
                    placeholder='Search...'
                />
                <span className='flex justify-center items-center cursor-pointer'>
                    <BsSearch className='text-xl'/>
                </span>
                <div className={`${debounce === '' && 'hidden'} absolute py-2 rounded-lg top-[110%] shadow-search left-0 w-full pb-2 bg-white`}>
                    <div className={`${searchResult.length === 0 && 'hidden'}`}>
                        {
                            searchResult?.map(result => (
                                <PictureSearch key={result._id} picture={result} handleNavigateSearch={handleNavigateSearch}/>
                            ))
                        }
                        <div className='flex justify-center mt-1'>
                            <span className='text-sm sm:p-2 p-1 font-semibold cursor-pointer'>More</span>
                        </div>
                    </div>
                    <div className={`${searchUserValue.length === 0 && 'hidden'}`}>
                        {
                            searchUserValue?.map(user => (
                                <Account key={user?._id} user={user} handleNavigateSearch={handleNavigateSearch}/>
                            ))
                        }
                        <div className='flex justify-center mt-1'>
                            <span className='text-sm sm:p-2 p-1 font-semibold cursor-pointer'>More</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='items-center gap-2 hidden md:flex'>
                <button onClick={() => handleNavigate('/upload')} className='bg-btn-main text-lg font-medium text-white outline-none hidden lg:block'>
                    Upload
                </button>
                <button onClick={() => handleNavigate('/sign-up')} className={`${user ? 'hidden' : ''} bg-btn-main text-base sm:text-xl font-medium text-white outline-none`}>
                    Join
                </button>
                <div ref={personRef} className={`${user ? '' : 'hidden'} relative cursor-pointer ml-2`}>
                    <div className='w-[50px] h-[50px] overflow-hidden rounded-full' onClick={() => setShow(!show)}>
                        <img className='w-full h-full' src={user?.avatarUrl} alt="" />
                        {/* <BsPersonCircle className='text-4xl'/> */}
                    </div>
                    <ul className={`${show ? '' : 'hidden'} absolute min-w-[150px] pb-1 overflow-hidden rounded-lg text-xl bg-white shadow-modal-header right-0 top-[100%] mt-4 z-10`}>
                        <li onClick={() => handleNavigatePage(`/profile/${user?._id}`)} className='pl-4 py-2 hover:bg-slate-100'>
                            <span>Profile</span>
                        </li>
                        <li onClick={() => handleNavigatePage('/setting')} className='pl-4 py-2 hover:bg-slate-100'>
                            <span>Setting</span>
                        </li>
                        <li onClick={logoutUser} className='pl-4 py-2 hover:bg-slate-100'>
                            <Link to="#">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div onClick={() => handleNavigate(`${user ? '/upload' : '/sing-in'}`)} className='flex md:hidden font-semibold'>
                {user ? 'Upload' : 'Login'}
            </div>
        </div>
    )
}

export const Account:React.FC<iPropsAccount> = ({user, handleNavigateSearch}) => {
    return (
        <div onClick={() => handleNavigateSearch(`/profile/${user?._id}`)} className='px-4 py-2 hover:bg-slate-200 duration-300 cursor-pointer flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <div className='border border-black rounded-full'>
                    <Avatar className={'w-[40px] h-[40px]'} image={user?.avatarUrl}/>
                </div>
                <div className='font-sans'>
                    <h2 className='text-lg font-semibold truncate'>{user?.nickName}</h2>
                    <p className='text-sm'>{user?.occupation}</p>
                </div>
            </div>
        </div>
    )
}

export const PictureSearch:React.FC<iDataSearchName> = ({picture, handleNavigateSearch}) => {
    return (
        <div onClick={() => handleNavigateSearch(`/detail/${picture?._id}`)}>
            <p className='px-6 py-[6px] truncate text-sm sm:text-base font-medium cursor-pointer hover:bg-slate-200 duration-300'>{picture?.name}</p>
        </div>
    )
}

export default Header