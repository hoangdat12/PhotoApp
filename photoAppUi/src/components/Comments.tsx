import React, {useEffect, useState, useRef, HtmlHTMLAttributes, memo} from 'react'
import axios from 'axios'

import {AiOutlineSend, AiFillLike} from 'react-icons/Ai'
import {IoIosMore} from 'react-icons/io'

import { Avatar } from './Picture'
import { getUserFromLocalStorage } from '../ultils/authUltils'
import { calculatorTime } from '../ultils/ultils'
import useInnerWidth from '../hook/useInnerWidth'

export interface iPropsComments {
    pictureId: string | undefined,
}

export interface iPropsComment {
    comment: iDataComments,
    pictureId: string | undefined,
    myAvatar: string
}

export interface iAuthor {
    authorId: string,
    photographer: string,
    photographer_url: string
}

export interface iDataComments {
    author: iAuthor,
    comment_like_num: number,
    comment_like: iAuthor[],
    content: string,
    createdAt: string,
    updatedAt: string,
    parrent_slug: string,
    pictureId: string,
    slug: string,
    _id: string,
}

const Comments:React.FC<iPropsComments> = ({pictureId}) => {
    const user = getUserFromLocalStorage()

    const [inputValue, setInputValue] = useState<string>('')
    const [comments, setComments] = useState<iDataComments[]>([])
    const [pageCurrent, setPageCurrent] = useState(1)
    const [total, setTotal] = useState(0)

    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const innerWidth = useInnerWidth()
    const getComment = async (page = 1,limit = 5) => {
        const body = {
            pictureId
        }

        const URL = `http://localhost:8080/comment/get?page=${page}&limit=${limit}`
        const res = await axios.post(URL, body)
        if (res.status === 200) {
            setComments(res.data.result)
            setTotal(res.data.total)
        }
    } 

    useEffect(() => {
        getComment()
    }, [])

    useEffect(() => {
        if (inputValue !== '') {
            const keyEnter = (e:any) => {
                if (e.keyCode === 13) {
                    handleComment()
                }
            }
    
            document.addEventListener('keyup', keyEnter)
    
            return () => {
                document.removeEventListener('keyup', keyEnter)
            }
        }
    })

    const handleComment = async () => {
        if (pictureId) {
            const body = {
                author: {
                    authorId: user?._id,
                    photographer_url: user?.avatarUrl,
                    photographer: user?.nickName
                },
                pictureId,
                content: inputValue
            }
    
            const URL = 'http://localhost:8080/comment/create'
            const res = await axios.post(URL, body)
            if (res.status === 201) {
                setInputValue('')
                if (innerWidth < 640) {
                    inputRef.current?.focus()
                } 
                else {
                    textareaRef.current?.focus()
                }
            }
        }
    }

    const handleMoreComments = () => {
        if (total > 0) {
            getComment(pageCurrent + 1)
            setPageCurrent(prev => prev + 1)
        }
    }

    return (
        <div className='mt-10 bg-slate-300 rounded-xl sm:p-8 p-4'>
            <div className='sm:flex hidden gap-4 w-full'>
                <div><Avatar className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] cursor-pointer' image={user?.avatarUrl}/></div>
                <div className='relative w-full'>
                    <label 
                        htmlFor='message' 
                        className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white"
                    >
                        Comments
                    </label>
                    <textarea 
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id="message" 
                        rows={3} 
                        className="block p-2.5 pb-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-0" 
                        placeholder="Write your thoughts here..." 
                    />
                    <span 
                        onClick={handleComment}
                        className='absolute bottom-2 right-2 p-2 rounded-full hover:bg-slate-100 text-2xl cursor-pointer outline-0'
                    >
                        <AiOutlineSend />
                    </span>
                </div>
            </div>
            <div className={`${comments.length !== 0 && 'sm:mt-10 sm:mb-10 mb-4'}`}>
                {
                    comments?.map(comment => (
                        <CommentPicture key={comment?._id} comment={comment} pictureId={pictureId} myAvatar={user?.avatarUrl}/>
                    ))
                }
            </div>
            <div className={`${comments.length !== 0 && 'hidden'} flex my-6 sm:mt-12 justify-center`}>
                <h2 className='text-xl sm:text-2xl font-semibold'>No comments yet</h2>
            </div>
            <div>
                <h2 
                    onClick={handleMoreComments} 
                    className={`${total <= 0 && 'hidden'} font-semibold underline cursor-pointer flex justify-end mb-8 sm:mb-0`}
                >
                    View more comments
                </h2>
            </div>
            <div className='sm:hidden flex gap-4 w-full'>
                <div><Avatar className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] cursor-pointer' image={'https://static-prod.adweek.com/wp-content/uploads/2020/05/FacebookAvatarsUS-1.jpg'}/></div>
                <div className='relative flex justify-center items-center flex-1 gap-2 pl-3 pr-8 py-1 bg-white rounded-md'>
                    <input 
                        ref={inputRef}
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        className='text-base flex-1 outline-none bg-transparent' 
                        type="text" 
                        name="comment" 
                        placeholder='Write comments...' 
                    />
                    <span 
                        onClick={handleComment}
                        className='absolute bottom-50% cursor-pointer right-2'
                    >
                        <AiOutlineSend />
                    </span>
                </div>
            </div>
        </div>
    )
}

export const CommentPicture:React.FC<iPropsComment> = ({comment, pictureId, myAvatar}) => {
    const [replyComments, setReplyComments] = useState<iDataComments[]>([])
    const [currentReply, setCurrentReply] = useState(1)
    const [total, setTotal] = useState(0)

    const getReplyComment = async (page = 1, limit = 1) => {
        const body = {
            pictureId: pictureId,
            parrent_slug: comment?.slug
        }
        const URL = `http://localhost:8080/comment/get?page=${page}&limit=${limit}`
        const res = await axios.post(URL, body)
        if (res.status === 200) {
            setReplyComments(res.data.result)
            setTotal(res.data.total)
        }
    }

    useEffect(() => {
        getReplyComment()
    }, [pictureId])

    const handleMoreComments = () => {
        if (total > 0) {
            getReplyComment(currentReply + 1, 5)
            setCurrentReply(prev => prev + 1)
        }
    }
    return (
        <div>
            <Comment key={comment?._id} comment={comment} pictureId={pictureId} myAvatar={myAvatar}/>
            <div className='sm:pl-8 pl-4'>
                {
                    currentReply !== 0 && replyComments?.map(replyComment => (
                        <Comment key={replyComment?._id} comment={replyComment} pictureId={pictureId} myAvatar={myAvatar}/>
                    ))
                }
                
                <div >
                    <h2 
                        onClick={handleMoreComments} 
                        className={`${total === 0 && 'hidden'} font-semibold underline cursor-pointer flex mt-2 mb-4 pb-2 sm:pl-14 pl-12 sm:mb-0`}
                    >
                        View more reply comments
                    </h2>
                </div>
            </div>
        </div>
    )
}

export const Comment:React.FC<iPropsComment> = memo(({comment, pictureId, myAvatar}) => {
    const time = calculatorTime(comment?.createdAt)
    const user = getUserFromLocalStorage()

    const modalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const replyInputRef = useRef<HTMLInputElement>(null)
    const replyRef = useRef<HTMLDivElement>(null)
    const divRef = useRef<HTMLDivElement>(null)

    const [isOwn, setIsOwn] = useState(false)
    const [show, setShow] = useState(false)
    const [edit, setEidt] = useState(false)
    const [commentValue, setCommentValue] = useState(comment?.content)
    const [isLikeComment, setIsLikeComment] = useState(false)
    const [numberLike, setNumberLike] = useState(comment?.comment_like_num)
    const [isReply, setIsReply] = useState(false)
    const [reply, setReply] = useState('')

    useEffect(() => {
        setIsOwn(comment?.author?.authorId === user?._id)
    }, [comment?.author?.authorId])

    useEffect(() => {
        if (show || edit || replyRef) {
            const handleCheckClickOutSide = (e:any) => {
                if (modalRef.current && !modalRef.current.contains(e.target)) {
                    setShow(false)
                }
                if (divRef.current && !divRef.current.contains(e.target)) {
                    setEidt(false)
                }
                if (replyRef.current && !replyRef.current.contains(e.target)) {
                    setIsReply(false)
                }
            }

            document.addEventListener('mousedown', handleCheckClickOutSide)

            return () => {
                document.removeEventListener('mousedown', handleCheckClickOutSide)
            }
        }
    }, [show, edit, replyRef])

    useEffect(() => {
        const checkLikeComment = async () => {
            const body = {
                slug: comment?.slug,
                authorId: comment?.author?.authorId
            }

            const URL = 'http://localhost:8080/comment/check-like'
            const res = await axios.post(URL, body)
            if (res.status === 200) {
                setIsLikeComment(res.data.result)
            }
        }
        checkLikeComment()
    }, [pictureId])

    useEffect(() => {
        if (edit) {
            inputRef.current?.focus()
        }
    }, [edit])

    useEffect(() => {
        if (isReply) {
            replyInputRef.current?.focus()
        }
    }, [isReply])

    useEffect(() => {
        if (reply !== '') {
            const keyEnter = (e:any) => {
                if (e.keyCode === 13) {
                    handleReplyCommet()
                }
            } 
    
            document.addEventListener('keydown', keyEnter)
    
            return () => {
                document.removeEventListener('keydown', keyEnter)
            }
        }
    })

    const handleShowModalMore = () => {
        setShow(true)
    }

    const handleDeleteComment = async () => {
        const URL = 'http://localhost:8080/comment/delete'
        const res = await axios.post(URL, {slug: comment?.slug})
        if (res.status === 200) {
            setShow(false)
        }
    }

    const handleShowEditComment = () => {
        setEidt(true)  
        setShow(false)     
    }

    const handleUpdateComment = async () => {
        if (commentValue !== comment?.content || commentValue !== '') {
            const body = {
                slug: comment?.slug,
                content: commentValue
            }
    
            const URL = 'http://localhost:8080/comment/update'
            const res = await axios.post(URL, body)
            if (res.status === 200) {
                setEidt(false)
            }
        }
    }

    const handleLikeComment = async () => {
        const body = {
            slug: comment?.slug,
            author: comment?.author
        }

        const URL = 'http://localhost:8080/comment/like'
        const res = await axios.post(URL, body) 
        if (res.status === 200) {
            setIsLikeComment(!isLikeComment)
            if (isLikeComment) {
                setNumberLike(prev => prev - 1)
            } else {
                setNumberLike(prev => prev + 1)
            }
        }
    }

    const handleShowReply = () => {
        setIsReply(true)
    }

    const handleReplyCommet = async () => {
        const parrent_slug = comment?.parrent_slug === "" ? comment?.slug : comment?.parrent_slug
        const body = {
            author: {
                authorId: user?._id,
                photographer_url: user?.avatarUrl,
                photographer: user?.nickName
            },
            pictureId: pictureId,
            content: reply,
            parrent_slug
        }
        const URL = 'http://localhost:8080/comment/create'
        const res = await axios.post(URL, body)
        if (res.status === 201) {
            setReply('')
            replyInputRef.current?.focus()
        }
    }

    return (
        <div className='flex gap-2 md:gap-3 mt-4 items-start'>
            <div className=''>
                <Avatar className='w-[40px] h-[40px] cursor-pointer' image={comment?.author?.photographer_url}/>
            </div>
            <div className='text-lg font-medium flex-1'>
                <div className='relative px-4 py-2 md:p-3 bg-slate-100 flex-1 rounded-lg'>
                    <div className='flex justify-between'>
                        <span className='text-lg font-semibold mr-2'>{comment?.author?.photographer}</span>
                        <div className={`relative flex items-center justify-center ${!isOwn && 'hidden'}`}>
                            <span onClick={handleShowModalMore} className='p-1 hover:bg-slate-200 rounded-full cursor-pointer'><IoIosMore /></span>
                            <div ref={modalRef} className={`absolute flex flex-col overflow-hidden bg-white bottom-8 shadow-md rounded-xl right-[50%] translate-x-[50%] ${!show && 'hidden'}`}>
                                <span onClick={handleShowEditComment} className='px-6 py-[6px] flex-1 hover:bg-slate-200 cursor-pointer'>Edit</span>
                                <span onClick={handleDeleteComment} className='px-6 py-[6px] flex-1 hover:bg-slate-200 cursor-pointer'>Delete</span>
                            </div>
                        </div>
                    </div>
                    <p className={`${edit && 'hidden'}`}>{comment.content}</p>
                    <div ref={divRef} className={`flex flex-col sm:flex-row gap-2 mt-2 ${!edit && 'hidden'}`}>
                        <input 
                            ref={inputRef}
                            onChange={(e) => setCommentValue(e.target.value)}
                            value={commentValue} 
                            type="text" 
                            className='flex-1 outline-none bg-slate-200 px-4 py-2 sm:px-4 rounded-lg'
                        />
                        <div className='flex justify-end'>
                            <span onClick={handleUpdateComment} className='px-4 py-[6px] sm:px-4 sm:py-2 cursor-pointer bg-slate-200 hover:bg-slate-300 rounded-lg'>Update</span>
                        </div>
                    </div>
                    <div className={`${numberLike === 0 && 'hidden'} absolute -bottom-[50%] translate-y-[-50%] right-4 flex gap-1 sm:gap-2`}>
                        <span className='text-blue-500'><AiFillLike /></span>
                        <span className='text-sm'>{numberLike}</span>
                    </div>
                </div>
                <div className='flex items-end gap-3 text-base sm:px-4 px-2 mt-1 sm:mt-2'>
                    <span onClick={handleLikeComment} className={`${isLikeComment && 'text-blue-500'} cursor-pointer font-semibold`}>Like</span>
                    <span onClick={handleShowReply} className='cursor-pointer font-semibold'>Reply</span>
                    <span className='text-sm'>{time}</span>
                </div>
                <div className={`${!isReply && 'hidden'} flex sm:gap-2 items-center mt-2`}>
                    <div>
                        <Avatar className='sm:block hidden w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] cursor-pointer' image={myAvatar}/>
                    </div>

                    <div ref={replyRef} className={`flex flex-1 items-center rounded-lg px-3 sm:px-4 py-[6px] gap-2 bg-white`}>
                        <input 
                            ref={replyInputRef}
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className='outline-none flex-1 bg-transparent text-base' 
                            type="text" 
                            name="comment" 
                            placeholder='Write comments...' 
                        />
                        <span 
                            onClick={handleReplyCommet}
                            className='cursor-pointer'
                        >
                            <AiOutlineSend />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default memo(Comments)