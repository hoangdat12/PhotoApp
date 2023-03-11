import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import {FiChevronRight} from 'react-icons/fi'

import Layout from '../components/layout/Layout'
import { iImageData } from '../components/Picture'
import { iDataSearchUser } from '../components/layout/Header'
import { Account } from '../components/layout/Header'
import Masonary from '../components/Masonary'
import Pagination from '../components/Pagination'

const SearchResult = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [searchResult, setSearchResult] = useState<iImageData[]>([])
    const [searchUserResult, setSearchUserResult] = useState<iDataSearchUser[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [loading, setLoading] = useState(false)

    const searchKeyWord = location.state

    useEffect(() => {
        setLoading(true)
        const getSearchResult = async () => {
            const limit = 20
            const URL = `http://localhost:8080/picture/list?search=${searchKeyWord}&limit=${limit}&page=${currentPage}`
            const res = await axios.get(URL)
            console.log(res)
            if (res.status === 200) {
                setSearchResult(res.data.result)
                setTotalPage(Math.ceil(res.data.total / limit))
            }
        }
        const getSearchUserResult = async () => {
            const limit = 5
            const URL = `http://localhost:8080/user/list?search=${searchKeyWord}&limit=${limit}`
            const res = await axios.get(URL)

            if (res.status === 200) {
                setSearchUserResult(res.data.result)
            }
        }
        const timer = setTimeout(() => {
            setLoading(false)
        }, 800)
        getSearchUserResult()
        getSearchResult()

        return () => {
            clearTimeout(timer)
        }
    }, [searchKeyWord, currentPage])

    useEffect(() => {
        window.scroll(0,0)
    }, [currentPage])

    const handleNavigateSearch = (link: string) => {
        navigate(link)
    }

    return (
        <Layout>
            <div className='sm:my-10 my-4 sm:w-[80%] w-[90%] mx-auto'>
                {
                    searchUserResult?.length !== 0 &&
                    <div>
                        <div className='flex justify-between items-center py-2'>
                            <h2 className='sm:text-3xl text-2xl font-semibold'>Accounts</h2>
                            <span className='flex items-center text-base cursor-pointer font-medium'>See more <FiChevronRight/></span>
                        </div>
                        <div>
                            {
                                searchUserResult?.map(user => (
                                    <Account key={user?._id} user={user} handleNavigateSearch={handleNavigateSearch}/>
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    searchResult?.length && 
                    <>
                        <div className={`${searchUserResult?.length !== 0 && 'mt-10'}`}>
                            <div className='flex justify-between items-center py-2'>
                                <h2 className='sm:text-3xl text-2xl font-semibold'>Posts</h2>
                            </div>
                            <div>
                                <Masonary pictures={searchResult} loading={loading}/>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Pagination totalPage={totalPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                        </div> 
                    </>
                }
            </div>
        </Layout>
    )
}

export default SearchResult