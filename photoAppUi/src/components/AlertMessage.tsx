import React from 'react'

import {AiOutlineCloseCircle} from 'react-icons/Ai'

export interface iPropsAlert {
    message: string,
    color: string,
    setActive: (active:boolean) => void
}

export const AlertMessage:React.FC<iPropsAlert> = ({message, color, setActive}) => {
    return (
        <div className="text-white px-4 fixed z-50 bottom-16 left-2 md:bottom-6 md:left-24 flex flex-row items-center justify-between bg-amber-500 shadow-lg p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap">
            <div className={`inline-flex items-center text-${color}-700 text-lg font-medium`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd" />
                </svg>
                {message}
            </div>
            <div onClick={() => setActive(false)} className={`ml-4 text-xl text-${color}-700 cursor-pointer`}>
                <AiOutlineCloseCircle />
            </div>
        </div>
    )
}