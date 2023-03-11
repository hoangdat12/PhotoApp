import React, {memo} from 'react'

export interface iPropsPagination {
    currentPage: number
    setCurrentPage: (page: number) => void,
    totalPage?: number
}

export const Pagination:React.FC<iPropsPagination> = ({setCurrentPage, currentPage, totalPage = 1}) => {
    const pagination = 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
    const active = 'px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
    
    const paginationPage = []
    for (let idx = 0; idx < totalPage; idx++) {
        paginationPage.push(idx)
        if (paginationPage.length === 6) {
            break 
        }
    }

    const handleNextPage = () => {
        if (currentPage !== totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevious = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePaginationPage = (page: number) => {
        setCurrentPage(page)
    } 

    return (
        <nav aria-label="Page navigation">
            <ul className="inline-flex items-center -space-x-px">
                {
                    totalPage <= 6 ?
                        <>
                        <li>
                            <span onClick={handlePrevious} className={`${currentPage === 1 ? 'hidden' : ''} block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                <span className="sr-only">Previous</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </span>
                        </li>
                        {
                            paginationPage?.map((page) => (
                                <li key={page}>
                                    <span onClick={() => handlePaginationPage(page + 1)} className={currentPage === page + 1 ? active : pagination}>{page + 1}</span>
                                </li>
                            ))
                        }
                        <li>
                            <span onClick={handleNextPage} className={`${currentPage === totalPage && 'hidden'} block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                <span className="sr-only">Next</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            </span>
                        </li>
                        </>
                    :
                    <>
                    <li>
                        <span onClick={handlePrevious} className={`${currentPage === 1 ? 'hidden' : ''} block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            <span className="sr-only">Previous</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </span>
                    </li>
                    <li>
                        <span onClick={() => handlePaginationPage(1)} className={currentPage === 1 ? active : pagination}>1</span>
                    </li>
                    <li>
                        <span onClick={currentPage >= 4 ? undefined : () => handlePaginationPage(2)} className={currentPage === 2 ? active : pagination}>{currentPage >= 4 ? '...' : '2'}</span>
                    </li>

                    {/*  */}
                    {/* Current Page >= totalPage - 3 then show else hidden */}
                    <li>
                        <span onClick={() => handlePaginationPage(currentPage >= 4 ? currentPage - 1 : 3)} className={`${currentPage === 3 || currentPage === currentPage - 1 ? active : pagination} ${currentPage > totalPage - 3 ? 'hidden' : ''}`}>{currentPage >= 4 ? currentPage - 1 : '3'}</span>
                    </li>
                    <li>
                        <span onClick={() => handlePaginationPage(currentPage >= 4 ? currentPage : 4)} className={`${currentPage === 4 || currentPage >= 4 ? active : pagination} ${currentPage > totalPage - 3 ? 'hidden' : ''}`}>{currentPage >= 4 ? currentPage : '4'}</span>
                    </li>
                    {/* Current Page >= totalPage - 3 then hidden else show */}
                    <li>
                        <span onClick={() => handlePaginationPage(totalPage - 3)} className={`${currentPage === totalPage - 3 ? active : pagination} ${currentPage <= totalPage - 3 ? 'hidden' : ''}`}>{totalPage - 3}</span>
                    </li>
                    <li>
                        <span onClick={() => handlePaginationPage(totalPage - 2)} className={`${currentPage === totalPage - 2 ? active : pagination} ${currentPage <= totalPage - 3 ? 'hidden' : ''}`}>{totalPage - 2}</span>
                    </li>
                    {/*  */}


                    <li>
                        <span onClick={currentPage < totalPage - 2 ? undefined : () => handlePaginationPage(totalPage - 1)} className={currentPage === totalPage - 1 ? active : pagination}>{currentPage >= totalPage - 2 ? totalPage - 1 : '...'}</span>
                    </li>
                    <li>
                        <span onClick={() => handlePaginationPage(totalPage)} className={currentPage === totalPage ? active : pagination}>{totalPage}</span>
                    </li>
                    <li>
                        <span onClick={handleNextPage} className={`${currentPage === totalPage && 'hidden'} block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            <span className="sr-only">Next</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </span>
                    </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default memo(Pagination)