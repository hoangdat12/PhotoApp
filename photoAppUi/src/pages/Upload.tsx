import React, {useCallback, useState, useEffect, useRef, memo} from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

import {IoIosImages} from 'react-icons/io'
import {BsCheckCircleFill, BsPlusLg, BsCircle} from 'react-icons/bs'
import {FaTrash} from 'react-icons/fa'
import {BiCopy} from 'react-icons/bi'
import {AiOutlineCloseCircle, AiOutlineSend} from 'react-icons/Ai'

import Layout from '../components/layout/Layout'
import { getUserFromLocalStorage } from '../ultils/authUltils'

export interface iPropsTerm {
    term: string,
    letter: string
}

export interface iPropsInputLabel {
    option: boolean
    name: string,
    label: string
    className?: string,
    icon: boolean,
    onChange: (value: string) => void,
    value: string
}

export interface iPropsUploadImage {
    image: object,
    setImage: (image:object) => void
}

const Upload = () => {
    return (
        <Layout>
            <div className='w-full h-full pt-10 pb-28 md:pb-40 md:pt-16 xl:pb-0 mb-10'>
                <Routes>
                    <Route path='/' element={<UploadImage />}/>
                    <Route path='/infor' element={<UploadInforImage />}/>
                </Routes>
            </div>
        </Layout>
    )
}

export const UploadImage:React.FC = () => {
    const navigate = useNavigate()
    const onDrop = useCallback((acceptedFiles:any) => {
        acceptedFiles.forEach((file:any) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
                const binaryStr = reader.result
                navigate('/upload/infor', {state: acceptedFiles[0]})
            }
            reader.readAsArrayBuffer(file)
        })
        
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})
    
    return (
        <>
            <div {...getRootProps()} className='flex flex-col items-center justify-center cursor-pointer md:w-[80%] w-[90%] mx-auto h-[380px] border-2 border-dashed border-[#dfdfe0] rounded-xl'>
                <input {...getInputProps()} />
                <span className='p-2 md:p-4 bg-amber-300 rounded-xl'>
                    <IoIosImages className='text-[4rem] text-white'/>
                </span>
                <div className='my-6 flex flex-col items-center'>
                    <h3 className='text-2xl md:text-4xl font-bold'>Drag and drop</h3>
                    <h3 className='text-2xl md:text-4xl font-bold'>to upload</h3>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-[90%] sm:w-[80%] xl:w-[70%] mx-auto mt-6'>
                <Term term={'Original '} letter={'content you captured'}/>
                <Term term={'Original '} letter={'content you captured'}/>
                <Term term={'Original '} letter={'content you captured'}/>
                <Term term={'Original '} letter={'content you captured'}/>
                <Term term={'Original '} letter={'content you captured'}/>
                <Term term={'Original '} letter={'content you captured'}/>
            </div>
            <NavUploadPhoto />
        </>
    )
}

export const UploadInforImage:React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [urlImage, setUrlImage] = useState('')

    useEffect(() => {
        setUrlImage(URL.createObjectURL(location.state))
        return () => {
            URL.revokeObjectURL(urlImage)
        }
    }, [location.state])

    const user = getUserFromLocalStorage()

    const inputRef = useRef<HTMLInputElement>(null)
    const [types, setType] = useState<string[]>([])
    const [typeValue, setTypeValue] = useState('')
    const [isCharges, setIsCharges] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    const handleType = () => {
        if (typeValue === '') {
            return 
        }
        setType(prev => [...prev, typeValue])
        setTypeValue('')
        inputRef.current?.focus()
    }

    // IMAGE FREE OR CHARGES
    const handleChangeCharges = (isCharge: boolean) => {
        setIsCharges(isCharge)
    }

    // DELETE ENTERED TYPE 
    const handleDeleteType = (type:string) => {
        setType(prev => prev.filter(name => name !== type))
    }

    const handleDeletePicture = () => {
        navigate('/upload')
    }

    const handlePostImage = async (e:any) => {
        e.preventDefault()
        const formData = new FormData();
        const file = location.state
        const pictureUrl = location.state.name
        const priceImage = parseInt(price) | 0
        const author = {
            authorId: user?._id,
            photographer_url: user?.avatarUrl,
            photographer: user?.nickName
        }

        formData.append('picture', priceImage.toString())
        formData.append('author', JSON.stringify(author))
        formData.append('pictureUrl', pictureUrl)
        formData.append('picture', file)
        formData.append('name', title)
        formData.append('typePicture', types.join(' '))

        const URL = 'http://localhost:8080/picture/upload'
        const res = await axios.post(URL, formData)

        if (res.status === 201) {
            navigate(`/detail/${res.data._id}`)
        }
    }
    return (
        <>
        <div className='w-full xl:px-16 md:px-10 px-4 flex flex-col xl:flex-row items-center justify-between'>
            <div className='flex xl:block items-start mb-8 xl:mb-0 gap-4 w-full xl:w-auto'>
                <div className='w-[90px] h-[90px] bg-main-upload rounded-xl flex items-center justify-center cursor-pointer'>
                    <BsPlusLg className='text-2xl'/>
                </div>
                <div className='border-2 border-amber-300 p-[0.1rem] w-[92px] h-[92px] xl:mt-4 rounded-xl'>
                    <img className='w-full h-full object-cover rounded-xl' src={urlImage || 'https://images.pexels.com/photos/10916779/pexels-photo-10916779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt="" />
                </div>
            </div>

            <div className='w-full cursor-pointer block xl:hidden mb-6'>
                <img className='w-full rounded-xl overflow-hidden' src={urlImage || 'https://images.pexels.com/photos/10916779/pexels-photo-10916779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt="" />
            </div>

            <div className='flex justify-center mb-8 xl:hidden'>
                <button onClick={handleDeletePicture}>Delete this picture</button>
            </div>

            <div className='bg-main-upload w-full xl:w-[80%] p-4 sm:p-8 md:p-14 xl:grid xl:grid-cols-2 items-center gap-10 rounded-xl'>
                <div className='col-span-1 px-4 cursor-pointer hidden xl:block'>
                    <img className='w-full rounded-xl overflow-hidden' src={urlImage || 'https://images.pexels.com/photos/10916779/pexels-photo-10916779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt="" />
                </div>
                <form onSubmit={handlePostImage} className='flex flex-col gap-6'>
                    <InputLabel value={title} onChange={setTitle} label={'Title'} option={true} name={'Enter title'} icon={false}/>
                    
                    <div className='flex gap-4'>
                        <div onClick={() => handleChangeCharges(false)} className={`flex items-center cursor-pointer px-4 py-2 rounded border border-gray-200  bg-white w-[50%]`}>
                            <div className={`flex items-center justify-center w-[16px] h-[16px] p-[1px] rounded-full border border-slate-400`}>
                                <span className={`w-full h-full rounded-full bg-blue-600 ${isCharges && 'hidden'}`} />
                            </div>
                            <span className='ml-2'>Free</span>
                        </div>
                        <div onClick={() => handleChangeCharges(true)} className="flex items-center cursor-pointer px-4 py-2 rounded border border-gray-200  bg-white w-[50%]">
                            <div className='flex items-center justify-center w-[16px] h-[16px] p-[1px] rounded-full border border-slate-400'>
                                <label className={`w-full h-full rounded-full bg-blue-600 ${!isCharges && 'hidden'}`} />
                            </div>
                            <span className='ml-2'>Charges</span>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className='md:text-lg font-medium mb-2 '>
                            Type
                        </label>
                        <div className='flex items-center bg-white px-4 md:px-4 py-2 md:py-2 md:text-lg font-medium rounded-xl border border-slate-400'>
                            <input ref={inputRef} onChange={(e) => setTypeValue(e.target.value)} value={typeValue} className='w-full outline-none border-none' type="text"/>
                            <AiOutlineSend onClick={handleType} className='cursor-pointer'/>
                        </div>
                        <div className='flex gap-2 mt-2'>
                            {
                                types?.map((type, idx) => (
                                    <div key={idx} className='flex items-center px-3 py-1 border border-slate-400 rounded-md bg-transparent'>
                                        {type}
                                        <AiOutlineCloseCircle onClick={() => handleDeleteType(type)} className='ml-2 cursor-pointer'/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                   {isCharges && <InputLabel value={price} onChange={setPrice} label={'Price'} option={false} name={'Enter price'} icon={false}/>}
                   <div className='flex lg:hidden items-center justify-between px-8 h-[80px] w-full z-10 bg-[#f7fbfd] fixed bottom-0 left-0'>
                        <div className='flex gap-2 items-center'>
                            <BsCircle className='text-3xl text-amber-500'/>
                            <span className='text-amber-500 text-2xl mb-2 font-medium'>1/1</span>
                        </div>
                        <button type='submit' className='text-black bg-amber-300'>Submit</button>
                    </div>

                    <div className='hidden lg:flex justify-center mt-10 w-full'>
                        <button type='submit' className='text-white bg-amber-300 text-2xl px-8 py-2'>Submit</button>
                    </div>
                </form>
            </div>  
            <div className='h-full cursor-pointer hidden xl:block'>
                <span className='w-[65px] h-[65px] flex items-center justify-center bg-main-upload rounded-full'>
                    <FaTrash className='text-xl' />
                </span>
            </div>
        </div>
        </>
    )
}

export const Term:React.FC<iPropsTerm> = memo(({term, letter}) => {
    return (
        <div className='col-span-1 flex sm:w-auto w-full justify-center gap-2 items-center pl-3 sm:pl-0 mt-5 text-base md:text-lg'>
            <span className='text-amber-300'>
                <BsCheckCircleFill />
            </span>
            <span className='text-black'>
                <a className='font-bold text-black' href="#">{term}</a>
                {letter}
            </span>
        </div>
    )
})

export const InputLabel:React.FC<iPropsInputLabel> = memo(({label, option, className, icon, onChange, value}) => {
    return (
        <div className={`${className} flex flex-col w-full`}>
            <label htmlFor="#" className='md:text-lg font-medium mb-2'>
                {label}
                <span className={`ml-2 opacity-90 ${!option && 'hidden'}`}>(Optional)</span>
            </label>
            <div className='flex items-center bg-white px-4 md:px-4 py-2 md:py-2 md:text-lg font-medium rounded-xl'>
                <input value={value} onChange={(e) => onChange(e.target.value)} className='w-full outline-none' type="text"/>
                <BiCopy className={`${!icon && 'hidden'} cursor-pointer text-lg`}/>
            </div>
        </div>
    )
})

export const NavUploadPhoto:React.FC = memo(() => {
    return (
        <>
            <div className='flex lg:hidden shadow-modal-header items-center justify-between px-8 h-[80px] w-full z-10 bg-[#f7fbfd] fixed bottom-0 left-0'>
                <div className='flex gap-2 items-center'>
                    <BsCircle className='text-3xl text-amber-300'/>
                    <span className='text-amber-300 text-2xl mb-2 font-medium'>1/1</span>
                </div>
                <button className='text-black bg-amber-300'>Submit</button>
            </div>

            <div className='hidden lg:flex justify-center mt-10 w-full'>
                <button className='text-white bg-amber-300 text-2xl px-8 py-2'>Submit</button>
            </div>
        </>
    )
})

export default Upload