import {useEffect, useState, useRef, memo} from 'react'
import { Route, Routes, useLocation , Link} from "react-router-dom"
import axios from 'axios'
import Dropzone from 'react-dropzone'

import Layout from "../components/layout/Layout"
import { InputSetting } from "../components/Input"
import { getText } from "../ultils/ultils"
import { getUserFromLocalStorage } from "../ultils/authUltils"
import { iUserData } from './Profile'
import {AlertMessage} from '../components/AlertMessage'

export interface iPropsSettingInforUser {
    inforUser: iUserData | undefined,
    setFile: (file: File) => void ,
    file: File | undefined
}

const Setting = () => {
    const location = useLocation()
    const user = getUserFromLocalStorage()

    const {header, textSave, text} = getText(location.pathname)

    const modalRef = useRef<HTMLDivElement>(null)

    const [userInfor, setUserInfor] = useState<iUserData>()
    const [confirm, setConfirm] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [timerId, setTimerId] = useState<number>()
    const [file, setFile] = useState<File>()

    const getInforUser = async () => {
        const URL = `http://localhost:8080/user/${user?._id}`
        const res = await axios.get(URL)
        if (res.status === 200) {
            setUserInfor(res.data.result)
        }
    }

    useEffect(() => {
        getInforUser()
    }, [user?._id])

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        // If on the page Update Infor 
        if (location.pathname === '/setting') {
            const body = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                nickName: formData.get('nickName'),
                email: formData.get('email'),
                occupation: formData.get('occupation'),
                location: formData.get('location'),
                fileName: file?.name
            }
            // Update information
            const URL = `http://localhost:8080/user/update/${user?._id}`
            const res = await axios.post(URL, body)
            if (res.status === 200) {
                // Show message change success
                handleUpdateSuccess()
                // If success, upload file image to server
                if (file) {
                    const formUploadImage = new FormData()
                    formUploadImage.append('picture', file)
                    await axios.post(`http://localhost:8080/user/change/avatar`, formUploadImage)
                }

                // Change infor User in localstorage
                const formLocalstorage = {
                    _id: res.data.result._id,
                    nickName: res.data.result.nickName,
                    email: res.data.result.email,
                    avatarUrl: res.data.result.avatarUrl
                }
                localStorage.setItem('user', JSON.stringify(formLocalstorage))
                getInforUser()
            }
        }
        // If on the page Change Password
        else {
            const body = {
                email: userInfor?.email,
                password: formData.get('currentPassword'),
                newPassword: formData.get('newPassword'),
                rePassword: formData.get('rePassword')
            }

            const URL = `http://localhost:8080/auth/password/change`
            const res = await axios.post(URL, body)
            if (res.status === 200) {
                // Show message change success
                handleUpdateSuccess()
            }
        }
        // Hidden modal confirm
        setConfirm(false)
    }

    const handleUpdateSuccess = async () => {
        setShowMessage(true)
        if (location.pathname !== '/setting') {
            window.location.reload()
        }
        const timer = setTimeout(() => {
            setShowMessage(false)
        }, 2000)
        setTimerId(timer)
    }

    useEffect(() => {
        return () => clearTimeout(timerId)
    }, [])

    return (
        <Layout>
            <div className="bg-gray-200">
                <div className="py-10 w-full px-4 sm:w-[90%] md:w-[80%] mx-auto">
                    <h1 className="text-2xl font-bold text-gray-700 px-6 md:px-0">Account Settings</h1>
                    <ul className="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
                        <li className={`${location.pathname === '/setting' && 'border-b-2 border-gray-800'} mr-8 text-gray-900`}>
                            <Link to="/setting" className="py-4 inline-block">Profile Info</Link>
                        </li>
                        <li className={`${location.pathname === '/setting/security' && 'border-b-2 border-gray-800'} mr-8 text-gray-900`}>
                            <Link to="/setting/security" className="py-4 inline-block">Security</Link>
                        </li>
                        <li className={`${location.pathname === '/setting/billing' && 'border-b-2 border-gray-800'} mr-8 text-gray-900`}>
                            <Link to="#_" className="py-4 inline-block">Billing</Link>
                        </li>
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full bg-white rounded-lg mx-auto mt-6 sm:mt-8 flex overflow-hidden rounded-b-none">
                            <div className="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
                                <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">{header}</h2>
                                <p className="text-xs text-gray-500">{text}</p>
                            </div>
                            <Routes>
                                <Route path="/" element={<SettingInforUser file={file} setFile={setFile} inforUser={userInfor}/>} />
                                <Route path="/security" element={<Security />} />
                            </Routes>
                        </div>
                       
                        <div className="flex justify-between bg-gray-300 rounded-b-lg border-t border-gray-200 py-6 px-4 sm:px-16">
                            <p className="text-xs text-gray-500 tracking-tight mt-2">{`Click on Save to update your ${textSave}`}</p>
                            <span 
                                onClick={() => setConfirm(true)} 
                                className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded uppercase cursor-pointer" 
                            >
                                Save
                            </span>
                        </div>
                        
                        <div className={`fixed ${confirm ? 'flex' : 'hidden'} items-center justify-center top-0 right-0 bottom-0 left-0 w-screen h-screen blackOverlay z-[101]`}>
                            <div ref={modalRef} className='px-8 py-6 bg-white text-center rounded-xl flex flex-col items-center justify-center mx-6'>
                                <h2 className='text-lg font-semibold'>{`Are you sure you want to update this ${location.pathname === '/setting' ? 'information' : 'password'}?`}</h2>
                                <div className='mt-6 flex justify-end gap-2'>
                                    <span onClick={() => setConfirm(false)} className='flex items-center justify-center text-black border border-black text-sm font-medium px-6 py-[6px] rounded-lg uppercase cursor-pointer'>Close</span>
                                    <button 
                                        type='submit'
                                        className='bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded-lg uppercase cursor-pointer'
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                { showMessage && <AlertMessage message={location.pathname === '/setting' ? 'Update Inforation Success!' : 'Change Password Success!'} color={'green'} setActive={setShowMessage}/>}
            </div>
        </Layout>
    )
}

export const SettingInforUser:React.FC<iPropsSettingInforUser> = memo(({inforUser, setFile, file}) => {
    const [urlImage, setUrlImage] = useState('')

    useEffect(() => {
        if (file) {
            setUrlImage(URL.createObjectURL(file))
            return () => {
                URL.revokeObjectURL(urlImage)
            }
        }
    }, [file])

    return (
        <div className="md:w-2/3 w-full">
            {
                inforUser && (
                    <>
                    <InputSetting value={inforUser?.firstName} name={'firstName'} type={'text'} label={'First Name'}/>
                    <InputSetting value={inforUser?.lastName} name={'lastName'} type={'text'} label={'Last Name'}/>
                    <InputSetting value={inforUser?.nickName} name={'nickName'} type={'text'} label={'Nick Name'}/>
                    <InputSetting value={inforUser?.email} name={'email'} type={'text'} label={'Email'}/>
                    <InputSetting value={inforUser?.occupation} name={'occupation'} type={'text'} label={'Occupation'}/>
                    <InputSetting value={inforUser?.location} name={'location'} type={'text'} label={'Location'}/>

                    <div className="sm:py-4 sm:px-16 p-6">
                        <label htmlFor="photo" className="text-sm text-gray-600 w-full block">Photo</label>
                        <div className="flex gap-2">
                            <img className="rounded-full w-20 h-20 object-center border-4 mt-2 border-gray-200" id="photo" src={urlImage !== '' ? urlImage : inforUser?.avatarUrl} alt="photo" />
                            <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div className='w-full mt-8 px-4 py-2 cursor-pointer bg-[#f1f1f1] rounded-lg outline-none ' {...getRootProps()}>
                                        <input 
                                            {...getInputProps()} 
                                        />
                                        <div className='flex gap-2 items-center'>
                                            {
                                                file ?
                                                <>
                                                    <p className='truncate'>{file?.name}</p>
                                                    <span className='px-2'>Change</span>
                                                </>
                                                :
                                                <>
                                                    <p>Change Avatar</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        </div>
                    </div>
                    </>
                )
            }
        </div>
    )
})

export const Security = memo(() => {
    return (
        <div className="md:w-2/3 w-full pt-10">
			<div className="sm:px-16 px-6">
                <label htmlFor="password" className="font-bold text-lg mb-1 text-gray-700 block">Set up password</label>
                <div className="text-gray-600 mt-2 mb-4">
                    To create a secure password, Please create a secure password that includes the following criteria.

                    <ul className="list-disc text-sm ml-4 mt-2">
                        <li>lowercase letters</li>
                        <li>numbers</li>
                        <li>capital letters</li>
                        <li>special characters</li>
                    </ul>	
                </div>
            </div>
            <div>
                <InputSetting name={'currentPassword'} type={'password'} isPassword={true} label={'Current Password'}/>
                <InputSetting name={'newPassword'} type={'password'} isPassword={true} label={'New Password'}/>
                <InputSetting name={'rePassword'} type={'password'} isPassword={true} label={'Confirm Password'}/>
            </div>
        </div>
    )
})
export default Setting