import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Layout from '../components/layout/Layout'
import Masonary, {MasonaryVideo} from '../components/Masonary'
import Pagination from '../components/Pagination'
import Banner from '../components/Banner'

export interface iPropsButtonSelectType {
    option1: string,
    option2: string,
    setOption: (option: string) => void
}

const Home = () => {
    const [pictures, setPictures] = useState([])
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [option, setOption] = useState('Pictures')

    useEffect(() => {
        setLoading(true)
        const getPictures = async () => {
            const limit = 20
            const URL = `http://localhost:8080/picture/trend?page=${currentPage}&limit=${limit}`
            const res = await axios.get(URL)
            if (res.status === 200) {
                setPictures(res.data.result)
                setTotalPage(Math.ceil(res.data.total / limit))
            }
        }
        const getVideos = async () => {
            setLoading(true)
            const limit = 20
            const URL = `http://localhost:8080/video/list?page=${currentPage}&limit=${limit}`
            const res = await axios.get(URL)
            console.log(res)
            if (res.status === 200) {
                setVideos(res.data.result)
                setTotalPage(Math.ceil(res.data.total / limit))
            }
        }

        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        getPictures()
        getVideos()
        // if (option === 'Pictures') {
        //     getPictures()
        // } else {
        //     getVideos()
        // }
        
        return () => clearTimeout(timer);
    }, [currentPage])

    useEffect(() => {
        window.scroll(0,0)
    }, [currentPage])

    return (
        <>
            <Layout>
                <Banner image={'https://images.pexels.com/photos/14288499/pexels-photo-14288499.jpeg?auto=compress&bri=5&cs=tinysrgb&fit=crop&h=500&w=1400&dpr=1'} text={'The best free stock photos, royalty free images & videos shared by creators.'}/>
                <div className='xl:container px-2 mx-auto xl:px-6 sm:px-6 md:px-12 w-full h-full pt-10'>
                    <div className='flex items-center justify-between mb-8'>
                        <span className='text-xl sm:text-3xl font-semibold'>Free Stock Photos</span>
                        <ButtonSelectType option1={'Pictures'} option2={'Videos'} setOption={setOption}/>
                    </div>
                    <Masonary pictures={pictures} loading={loading}/>
                    {/* <MasonaryVideo videos={videos} loading={loading} /> */}
                    <div className='w-full flex justify-center my-8'>
                        <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export const ButtonSelectType:React.FC<iPropsButtonSelectType> = ({option1, option2, setOption}) => {
    const [active, setActive] = useState(false)
    const activeLetter = 'text-md sm:text-2xl font-bold sm:font-semibold'

    const handleCLick = (option: string) => {
        if (option === option1) {
            setActive(false)
        } else {
            setActive(true)
        }
    }

    return (
        <div className='text-base sm:text-xl font-medium'>
            <span onClick={() => handleCLick(option1)} className={`${!active && activeLetter} px-3 sm:px-4 py-2 cursor-pointer`}>{option1}</span>
            <span onClick={() => handleCLick(option2)} className={` ${active && activeLetter}} px-3 sm:px-4 py-2 cursor-pointer border-l border-slate-500`}>{option2}</span>
        </div>
    )
}

export default Home