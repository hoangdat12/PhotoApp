import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = () => {
    let user = localStorage.getItem('user')
    return (
        user ? <Outlet /> : <Navigate to='/sign-in' replace={true}/>
    )
}

export const LoginSuccess = () => {
    let user = localStorage.getItem('user')
    return (
        user ? <Navigate to='/' replace={true}/> : <Outlet /> 
    )
}

export default PrivateRoute