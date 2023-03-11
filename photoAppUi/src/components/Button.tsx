import React, {useState} from 'react'

export interface iPropsButton {
    className?: string,
    letter?: string,
    Icon: React.ElementType
}

interface iProps {
    className?: string,
    letter: string,
    quantity?: number,
    handleOnClick?: () => void,
    state?: boolean,
    letterChange?: string
}

export interface iPropsBtnSelect {
    select1: string,
    select2: string,
    setSelectOne?: (select:boolean) => void,
    setSelectTwo?: (select:boolean) => void,
    myProfile?: boolean
}

const ButtonIcon:React.FC<iPropsButton> = ({className, letter, Icon}) => {
    return (
        <div className={`${className} border border-[#777] cursor-pointer px-4 py-2 flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg`}>
            <Icon className='text-xl mr-2 text-gray-blur'/>
            <span>{letter}</span>
        </div>
    )
}

export const Button:React.FC<iPropsButton> = ({className, Icon}) => {
    return (
        <span className={`${className} w-[40px] h-[40px] flex items-center justify-center text-xl bg-white text-slate-800 rounded-lg`}>
            <Icon/>
        </span>
    )
}

export const ButtonLetter:React.FC<iProps> = ({className, letter, handleOnClick, state = false, letterChange}) => {
    return (
        <span onClick={handleOnClick} className={`${className} px-4 py-2 border-2 border-slate-700 rounded-md text-sm sm:text-lg md:text-xl font-medium  cursor-pointer`}>
            {state ? letterChange : letter}
        </span>
    )
}

export const ButtonSelect:React.FC<iPropsBtnSelect> = ({select1, select2, setSelectOne, setSelectTwo, myProfile = true}) => {
    const [active, setActive] = useState(false)
    const activeLetter = 'text-md sm:text-2xl font-bold sm:font-semibold'

    const handleSelectOne = () => {
        setActive(false)
        setSelectOne ? setSelectOne(true) : null
        setSelectTwo ? setSelectTwo(false) : null
    }

    const handleSelectTwo = () => {
        setActive(true)
        setSelectTwo ? setSelectTwo(true) : null
        setSelectOne ? setSelectOne(false) : null
    }

    return (
        <div className='text-base sm:text-xl font-medium'>
            <span onClick={handleSelectOne} className={`px-3 sm:px-4 py-2 cursor-pointer ${!active && activeLetter}`}>{select1}</span>
            <span onClick={handleSelectTwo} className={` ${active && activeLetter} ${!myProfile && 'hidden'} px-3 sm:px-4 py-2 cursor-pointer border-l border-slate-500`}>{select2}</span>
        </div>
    )
}

export default ButtonIcon