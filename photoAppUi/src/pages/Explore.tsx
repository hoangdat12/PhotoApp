import React from 'react'
import { Route, Routes, useLocation, Link } from 'react-router-dom'

import {IoPersonAddOutline} from 'react-icons/io5'
import {AiOutlineMail, AiOutlineClockCircle} from 'react-icons/Ai'
import {BsChevronRight} from 'react-icons/bs'

import Layout from '../components/layout/Layout'
import {ButtonLetter, ButtonSelect} from '../components/Button'
import Banner from '../components/Banner'
import Masonary from '../components/Masonary'

export interface iPropsChallenge {
    className?: string
}

const Explores = () => {
    const location = useLocation()
    const active = 'px-4 py-2 rounded-lg bg-black text-white'

    return (
        <Layout>
            <Banner className={`${location.pathname === '/explore/videos' ? '' : 'hidden'}`} videos={'https://static.pexels.com/lib/videos/free-videos.mp4'} text={'The best free stock videos shared by the Pexels community.'}/>  
            <div className='xl:container px-4 mx-auto sm:px-6 md:px-12 w-full h-full pt-10'>
                <div className='w-full flex items-center justify-center gap-4 text-sm sm:text-lg md:text-xl font-medium'>
                    <Link to="/explore" className={`${location.pathname === '/explore' ? active : 'text-black'}`}>Home</Link>
                    <Link to="/explore/videos" className={`${location.pathname === '/explore/videos' ? active : 'text-black'}`}>Videos</Link>
                    <Link to="/explore/leader" className={`${location.pathname === '/explore/leader' ? active : 'text-black'}  `}>Leaderboard</Link>
                    <Link to="/explore/challenge" className={`${location.pathname === '/explore/challenge' ? active : 'text-black'}`}>Challenges</Link>
                </div>
                <Routes>
                    <Route path='/' element={<ExploreImage />}/>
                    <Route path='/videos' element={<ExploreVideos />}/>
                    <Route path='/leader/*' element={<ExploreLeader />}/>
                    <Route path='/challenge' element={<ExploreChallenge />}/>
                </Routes>
            </div>
            <div className={`${location.pathname === '/explore/challenge' ? '' : 'hidden'} w-full bg-black py-10 text-white px-4`} >
                <h1 className='text-center'>Past Challenges</h1>
                <Challenge className={'mt-6'}/>
                <Challenge className={'mt-20'}/>
                <Challenge className={'mt-20'}/>
                <Challenge className={'mt-20'}/>
                <Challenge className={'mt-20'}/>
            </div>
        </Layout>
    )
}

export const ExploreImage = () => {
    return (
        <>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-10'>Discover the Best of Pexels</h2>
            <Explore />
            <Explore />
            <Explore />
            <Explore />
        </>
    )
}

export const ExploreVideos = () => {

    return (
        <>
            <div className='mt-10'>
                <div className='flex items-center justify-between mb-8'>
                    <span className='text-xl sm:text-3xl font-semibold'>Free Stock Photos</span>
                    <ButtonSelect select1={'Trending'} select2={'New'}/>
                </div>
                <Masonary />
            </div>
        </>
    )
}

export const ExploreLeader = () => {
    return (
        <div className='mt-16'>
            <div className='flex flex-col items-center'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Popular Collections</h2>
                <h4 className='text-xl text-main mt-2 text-center'>{`Users with the most views of photos uploaded in the last 30 days`}</h4>
                <div className='w-full flex justify-start mt-8'>
                    <ButtonSelect select1={'Last 30 Days'} select2={'All Time'}/>
                </div>
                <Routes>
                    <Route path='/' element={<ExploreLeaderMonth />} />
                    <Route path='/all-time' element={<ExploreLeaderMonth />} />
                </Routes>
            </div>
        </div>
    )
}

export const ExploreLeaderMonth = () => {
    return (
        <div className='w-full pb-8'>
            <UserLeader />
            <UserLeader />
            <UserLeader />  
        </div>
    )
}

export const ExploreChallenge = () => {
    return (
        <div className='pb-10 px-2 sm:px-0'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-10'>Challenges</h2>
            <Challenge />
            <div className='flex justify-center mt-10'>
                <div className='flex xl:flex-row flex-col xl:items-center justify-between xl:w-[1000px] w-[600px] border border-[#999] p-6 rounded-xl'>
                    <div>
                        <h1 className='text-3xl font-bold'>Partner with Pexels</h1>
                        <p className='text-xl text-[#999] font-medium mt-2'>We love teaming up with other brands. Here’s how you can work with us..</p>
                    </div>
                    <ButtonLetter className={'px-6 py-3 bg-black text-white mt-4 xl:mt-0 max-w-[250px] flex justify-center'} letter={'Join in Challenge'} />
                </div>  
            </div>
        </div>
    )
}

export const Challenge:React.FC<iPropsChallenge> = ({className}) => {
    return (
        <div className={`${className} grid grid-cols-2 mt-10 gap-16`}>
            <div className='col-span-2 xl:col-span-1 flex justify-center xl:justify-end'>
                <div className='w-full sm:w-[600px] h-[250px] sm:h-[450px] flex gap-2 rounded-2xl overflow-hidden'>
                    <div className='w-[60%]'>
                        <img className='w-full' src="https://images.pexels.com/photos/10609938/pexels-photo-10609938.jpeg?auto=compress&cs=tinysrgb&h=400&w=280&fit=crop&crop=focalpoint&dpr=2" alt="" />
                    </div>
                    <div className='flex flex-col gap-2 w-[40%]'>
                        <div className='w-full h-[50%]'>
                            <img className='w-full h-full object-cover' src="https://images.pexels.com/photos/13918727/pexels-photo-13918727.jpeg?auto=compress&cs=tinysrgb&h=200&w=180&fit=crop&crop=focalpoint&dpr=2" alt="" />
                        </div>
                        <div className='relative w-full h-[50%]'>
                            <img className='w-full h-full object-cover' src="https://images.pexels.com/photos/573302/pexels-photo-573302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-blackOverlay cursor-pointer'>
                                <div className='text-white flex flex-col justify-center items-center'>
                                    <h1 className='text-2xl sm:text-4xl'>14.6K</h1>
                                    <div className='flex items-center gap-2'>
                                        <span>See all media</span>
                                        <BsChevronRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-span-2 xl:col-span-1 flex justify-center xl:justify-start items-center'>
                <div className='w-[600px] xl:w-[450px]'>
                    <h1 className='text-3xl sm:text-4xl'>Speciels Cup 2022</h1>
                    <p className='text-lg sm:text-xl font-semibold mt-2'>This (friendly) competition is a tournament to crown the country with the best photos & photographers on Pexels.</p>
                    <div className='flex items-center mt-8'>
                        <ButtonLetter className={'px-6 py-3 bg-black text-white hover:bg-slate-200 hover:text-black duration-300 mr-4'} letter={'Join in Challenge'} />
                        <span className='flex gap-1 items-center'><AiOutlineClockCircle className='text-2xl'/> 1 day</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Explore:React.FC = () => {
    return (
        <div className='mt-16'>
            <div className=''>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Popular Collections</h2>
                <div className='flex gap-2 sm:gap-4 my-4 flex-wrap'>
                    <ButtonLetter className={'hover:bg-black hover:text-white duration-300'} letter={'January'}/>
                    <ButtonLetter className={'hover:bg-black hover:text-white duration-300'} letter={'Winter'}/>
                    <ButtonLetter className={'hover:bg-black hover:text-white duration-300'} letter={'Winter Wallpaper'}/>
                </div>
            </div>
            <Collections />
            <Collections />
            <Collections />
        </div>
    )
}

export const Collections:React.FC = () => {
    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-bold mb-4'>Winner Wallpaper</h3>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                <div className='col-span-1'>
                    <img className='w-full object-center' src="https://images.pexels.com/photos/6738989/pexels-photo-6738989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div> 
                <div className='col-span-1'>
                    <img className='w-full object-center' src="https://images.pexels.com/photos/6738989/pexels-photo-6738989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div> 
                <div className='col-span-1'>
                    <img className='w-full object-center' src="https://images.pexels.com/photos/6738989/pexels-photo-6738989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div> 
                <div className='col-span-1'>
                    <img className='w-full object-center' src="https://images.pexels.com/photos/6738989/pexels-photo-6738989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div> 
            </div>
            <div className='flex items-center justify-center mt-4'>
                <span className='text-lg font-semibold px-4 py-[6px] cursor-pointer hover:bg-slate-200 rounded-lg'>More</span>
            </div>
        </div>
    )
}

export const UserLeader:React.FC = () => {
    return (
        <div className='grid grid-cols-2 mt-10'>
            <div className='flex col-span-2 xl:col-span-1'>
                <div className='flex'>
                    <span className='text-4xl sm:text-5xl mr-4 sm:mr-6 font-medium text-[#777] mt-2'>1</span>
                    <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
                        <img className='w-full' src="https://images.pexels.com/users/avatars/5767088/eugeniya-ziginova-346.jpeg?auto=compress&fit=crop&h=80&w=80&dpr=1" alt="" />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row xl:flex-col ml-6'>
                    <div className='mt-2'>
                        <h3 className='text-xl sm:text-2xl'>Eugenia Remark</h3>
                        <span className='text-[#777] text-lg sm:text-xl mt-2'>12M Views</span>
                    </div>
                    <div className='flex mt-2 gap-2 xl:ml-0 ml-6'>
                        <span className='w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] flex items-center justify-center border border-[#777] rounded-full cursor-pointer'><IoPersonAddOutline  className='text-xl'/></span>
                        <span className='w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] flex items-center justify-center border border-[#777] rounded-full cursor-pointer'><AiOutlineMail  className='text-xl'/></span>
                    </div>
                </div>
            </div>  

            <div className='hidden sm:flex col-span-2 xl:col-span-1 gap-2 xl:justify-end mt-4 xl:mt-0'>
                <div className='w-[180px] h-[180px] rounded-xl overflow-hidden cursor-pointer'>
                    <img className='w-full h-full object-cover' src="https://images.pexels.com/photos/14426082/pexels-photo-14426082.jpeg?w=200&h=200&fit=crop&dpr=1" alt="" />
                </div>
                <div className='w-[180px] h-[180px] rounded-xl overflow-hidden cursor-pointer sm:hidden md:block'>
                    <img className='w-full h-full object-cover' src="https://images.pexels.com/photos/14426082/pexels-photo-14426082.jpeg?w=200&h=200&fit=crop&dpr=1" alt="" />
                </div>
                <div className='w-[180px] h-[180px] rounded-xl overflow-hidden cursor-pointer xl:hidden'>
                    <img className='w-full h-full object-cover' src="https://images.pexels.com/photos/14426082/pexels-photo-14426082.jpeg?w=200&h=200&fit=crop&dpr=1" alt="" />
                </div>
                <div className='relative w-[180px] h-[180px] rounded-xl overflow-hidden cursor-point'>
                    <img className='w-full h-full object-cover' src="https://images.pexels.com/photos/14426082/pexels-photo-14426082.jpeg?w=200&h=200&fit=crop&dpr=1" alt="" />
                    <div className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-blackOverlay cursor-pointer'>
                        <div className='text-white flex flex-col justify-center items-center'>
                            <h1>126+</h1>
                            <div className='flex items-center gap-2'>
                                <span>See all media</span>
                                <BsChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explores