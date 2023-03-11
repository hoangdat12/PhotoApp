import {RiDashboardFill} from 'react-icons/ri'
import {FaCcDiscover, FaConnectdevelop, FaChessBoard, FaXbox} from 'react-icons/fa'
import {IoCloudUploadOutline, IoSettingsOutline} from 'react-icons/io5'
import {TbLicense} from 'react-icons/tb'
import {CgProfile} from 'react-icons/cg'

import { getUserFromLocalStorage } from './authUltils'


const user = getUserFromLocalStorage()
const userId = user?._id

export const Menus = [
    {
        title: 'Home',
        Icon: RiDashboardFill,
        path: '/'
    },
    {
        title: 'Discover',
        Icon: FaCcDiscover,
        path: '/explore'
    },
    {
        title: 'Challenges',
        Icon: FaConnectdevelop,
        path: '/explore/challenge'
    },
    {
        title: 'Leaderboard', 
        spacing: true,
        Icon: FaChessBoard,
        path: '/explore/leader'
    },

    {
        title: 'Upload',
        Icon: IoCloudUploadOutline,
        path: '/upload'
    },
    {
        title: 'License',
        Icon: TbLicense,
        submenu: true,
        path: '/license',
        submenuItems: [
            {
                title: 'License 1',
                path: '/license'
            },
            {
                title: 'License 2',
                path: '/license'
            },
            {
                title: 'License 3',
                path: '/license'
            }
        ]
    },
    {
        title: 'Blog', 
        spacing: true,
        Icon: FaXbox
    },

    {
        title: 'Profile',
        Icon: CgProfile,
        path: `/profile/${userId}`
    },
    {
        title: 'Setting',
        Icon: IoSettingsOutline,
        path: '/setting'
    }
]

export const mobileMenu = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Discover',
        path: '/explore'
    },
    {
        title: 'Challenges',
        path: '/explore/challenge'
    },
    {
        title: 'Leaderboard', 
        spacing: true,
        path: '/explore/leader'
    },

    {
        title: 'Upload',
        path: '/upload'
    },
    {
        title: 'License',
        path: '/license'
    },
    {
        title: 'Blog', 
        spacing: true,
        path: '/blog'
    },

    {
        title: 'Profile',
        path: `/profile/${userId}`
    },
    {
        title: 'Setting',
        path: '/setting'
    }
]