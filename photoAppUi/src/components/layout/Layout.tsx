import React, {useState} from 'react'
import LoadingBar from 'react-top-loading-bar'

import Header from './Header'
import SiderBar from './SiderBar'
import Footer from './Footer'

export interface iProps {
    children: React.ReactNode
}

export interface IPropsLayout {
    setOpen: (open: boolean) => void,
    open: boolean
    setOpenMobile: (openMobile: boolean) => void,
    openMobile: boolean,
    setProgress?: (number: number) => void,
    progress?: number
}

const Layout:React.FC<iProps> = ({children}) => {
    const [open, setOpen] = useState(false)
    const [openMobile, setOpenMobile] = useState(false)
    const [progress, setProgress] = useState(0)

    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <Header open={open} setOpen={setOpen} openMobile={openMobile} setOpenMobile={setOpenMobile} setProgress={setProgress} progress={progress}/>
            <SiderBar open={open} setOpen={setOpen} openMobile={openMobile} setOpenMobile={setOpenMobile} setProgress={setProgress} progress={progress}/>
            <div className={`content__main w-full ${open ? 'lg:w-header-open lg:left-[18rem]' : 'lg:w-header lg:left-[5rem]'} pt-[80px] duration-300`}>
                {children}
            </div>
            <Footer open={open} setOpen={setOpen} openMobile={openMobile} setOpenMobile={setOpenMobile}/>
        </>
    )
}

export default Layout