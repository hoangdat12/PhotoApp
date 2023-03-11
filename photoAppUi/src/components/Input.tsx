import React, {useState} from 'react'

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/Ai'

export interface iPropsInput {
    name?: string,
    className?: string
}

export interface iPropsInputLabel {
    className?: string,
    label?: string,
    placeholder?:string
}

export interface iPropsInputSetting {
    className?:string,
    label: string,
    type: string,
    name: string,
    isPassword?: boolean,
    value?: string
}

const Input:React.FC<iPropsInput> = ({name, className}) => {
    return (
        <input name={name} className={`${className} w-full px-4 py-3 bg-[#f1f1f1] rounded-lg outline-none`} type="text" placeholder={name}/>
    )
}

export const InputLabel:React.FC<iPropsInputLabel> = ({label, placeholder, className}) => {
    return (
        <div className={`${className}`}>
            <label htmlFor='#' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}

export const FileLabel:React.FC<iPropsInputLabel> = ({label, placeholder, className}) => {
    return (
        <div className={`${className} flex flex-col`}>
            <label htmlFor='#' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type="file" id="first_name" className="flex-1 bg-gray-50 relative px-2 py-2 border border-gray-500 text-gray-900 text-sm rounded-lg " placeholder={placeholder} required />
        </div>
    )
}

export const TextareLabel:React.FC<iPropsInputLabel> = ({label, placeholder, className}) => {
    return (
        <div className={`${className}`}>
            <label htmlFor='#' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea id="first_name" className="min-h-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}

export const InputSetting:React.FC<iPropsInputSetting> = ({label, type, isPassword, name, value}) => {
    const [showPassWord, setShowPassword] = useState(false)
    const [valueInput, setValueInput] = useState(value ? value : '')
    
    return (
        <>
            <div className="sm:py-6 sm:px-16 p-6">
                <label htmlFor="name" className="text-sm text-gray-600">{label}</label>
                <div className='flex items-center mt-2 border-2 border-gray-200 px-3 py-[6px] w-full rounded-lg text-base text-gray-900 focus:border-indigo-500'>
                    <input 
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        className="flex-1 focus:outline-none" 
                        type={showPassWord ? 'text' : type} 
                        name={name} 
                    />
                    {
                        isPassword && (
                            <span onClick={() => setShowPassword(!showPassWord)} className='text-xl cursor-pointer'>
                                {showPassWord ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        )
                        
                    }
                </div>
            </div>
            <hr className="border-gray-200" />
        </>
    )
}

export default Input