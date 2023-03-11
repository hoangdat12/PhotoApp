import React, { memo } from 'react'
import Masonry from 'react-masonry-css'
import { useNavigate } from 'react-router-dom'

import Picture, {PictureCollection} from './Picture'
import Video from './Video'
import { iImageData } from './Picture'
import { iVideoData } from './Video'

const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    500: 1
};

export interface iPropsMasonary {
    pictures?: any[],
    loading?: boolean,
    myProfile?: boolean | undefined
}

export interface iPropsMasonaryVideo {
    videos?: iVideoData[],
    loading?: boolean,
    myProfile?: boolean | undefined
}

export interface iPropsMasonaryCollection extends iPropsMasonary {
    isCollection?: boolean,
    text: string
}

const Masonary:React.FC<iPropsMasonary> = ({pictures, loading}) => {
    return (
        loading ? 
            <div className="flex flex-col justify-center items-center mb-4">
                <div className="sr-only spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                </div>
                <div className="visually-hidden text-2xl mt-4">Loading...</div>
            </div>
            :
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid flex animate-slide-fwd"
                columnClassName="my-masonry-grid_column"
            >
                {
                    pictures?.map((picture, idx) => (
                        <Picture key={idx} image={picture}/>
                    ))
                }
            </Masonry>
    )
}

export const MasonaryVideo:React.FC<iPropsMasonaryVideo> = ({videos, loading}) => {
    return (
        loading ? 
            <div className="flex flex-col justify-center items-center mb-4">
                <div className="sr-only spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                </div>
                <div className="visually-hidden text-2xl mt-4">Loading...</div>
            </div>
            :
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid flex animate-slide-fwd"
                columnClassName="my-masonry-grid_column"
            >
                {
                    videos?.map((video, idx) => (
                        <Video key={idx} video={video}/>
                    ))
                }
            </Masonry>
    )
}
 

export const MasonaryCollection:React.FC<iPropsMasonaryCollection> = memo(({pictures, loading, myProfile, isCollection, text}) => {
    const navigate = useNavigate()
    return (
        loading ? 
            <div className="flex flex-col justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                </div>
                <div className="visually-hidden text-2xl mt-4">Loading...</div>
            </div>
            :
            pictures?.length === 0 ? 
            <div className='mt-20 mb-10 flex flex-col items-center justify-center'>
                <h2 className='sm:text-3xl text-xl'>{text}</h2>
                <button onClick={() => navigate('/upload')} className={`${isCollection || !myProfile ? 'hidden' : ''} mt-4`}>Upload Now</button>
            </div> 
            :
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid flex animate-slide-fwd"
                columnClassName="my-masonry-grid_column"
            >
                {
                    pictures?.map((picture, idx) => (
                        <PictureCollection key={idx} image={picture} myProfile={myProfile} isCollection={isCollection}/>
                    ))
                }
            </Masonry>
    )
})

export default memo(Masonary)