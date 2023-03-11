import React from 'react'

import {BsSearch} from 'react-icons/bs'

export interface iPropsSearch {
    className?: string
}

const Search:React.FC<iPropsSearch> = ({className}) => {
    return (
        <div className={`flex items-center px-6 min-h-[40px] bg-[#f7f7f7] rounded-lg ${className}`}>
            <input type={'search'} className='w-[90%] bg-transparent focus:outline-none' placeholder='Search...'/>
            <span className='w-[10%] flex justify-center items-center cursor-pointer'>
                <BsSearch className='text-xl'/>
            </span>
        </div>
    )
}

export default Search