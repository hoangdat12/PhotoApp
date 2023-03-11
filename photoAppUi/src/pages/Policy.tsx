import React from 'react'
import { Route, Routes, useLocation, Link } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Banner from '../components/Banner'

const Policy = () => {
    const location = useLocation()
    const active = 'px-4 py-2 rounded-3xl bg-black text-white'

    return (
        <Layout>
            <Banner image={'https://theme.zdassets.com/theme_assets/9028340/6409ffd767dac0fda77edb46e780a4c6b9108fdf.jpg'} text={'Pexels Help Center'} title={'Policy'}/>  
            <div className='xl:container px-2 mx-auto xl:px-6 sm:px-6 md:px-12 w-full h-full pt-10'>
                <div className='w-full flex items-center justify-center gap-4 text-sm sm:text-lg md:text-xl font-medium'>
                    <Link to="/policy/" className={`${location.pathname === '/policy/' ? active : 'text-black'}`}>General</Link>
                    <Link to="/policy/photograper" className={`${location.pathname === '/policy/photograper' ? active : 'text-black'}  `}>Photograper</Link>
                    <Link to="/policy/api" className={`${location.pathname === '/policy/api' ? active : 'text-black'}`}>API</Link>
                </div>
                <Routes>
                    <Route path='/' element={<PoliCySpecial />}/>
                    <Route path='/photograper' element={<PoliCySpecial />}/>
                    <Route path='/api' element={<PoliCySpecial />}/>
                </Routes>
            </div>
        </Layout>
    )
}

const PoliCySpecial = () => {
    return (
        <div className='my-10 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
            <PolicyWeb />
            <PolicyWeb />
            <PolicyWeb />
            <PolicyWeb1 />
            <PolicyWeb />
        </div>
    )
}

const PolicyWeb = () => {
    return (
        <div className='col-span-1 p-8 rounded-lg border border-[#777]'>
            <h2 className='text-xl font-semibold'>Uploading photos or videos to Pexels</h2>
            <div className='mt-5'>
                <p className='mt-2'>What are the benefits of sharing photos and videos on Pexels?</p>
                <p className='mt-2'>What are the benefits of sharing photos and videos on Pexels?</p>
                <p className='mt-2'>What are the benefits of sharing photos and videos on Pexels?</p>
            </div>
            <button className='mt-10'>See All Article</button>
        </div>
    )
}


const PolicyWeb1 = () => {
    return (
        <div className='col-span-1 p-8 rounded-lg border border-[#777]'>
            <h2 className='text-xl font-semibold'>Uploading photos or videos to Pexels</h2>
            <div className='mt-5'>
                <p className='mt-2'>What are the benefits of sharing photos and videos on Pexels?</p>
                <p className='mt-2'>What are the benefits of sharing photos and videos on Pexels?</p>
            </div>
            <button className='mt-10'>See All Article</button>
        </div>
    )
}

export default Policy