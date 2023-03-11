import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import PrivateRoute, {LoginSuccess} from './ultils/PrivateRoute'
import Home from './pages/Home'
import Signup from './pages/SignUp'
import SignIn from './pages/SignIn'
import DetailImage from './pages/DetailImage'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import Explores from './pages/Explore'
import Policy from './pages/Policy'
import Contact from './pages/Contact'
import License from './pages/License'
import Setting from './pages/SettingPage'
import Test from './pages/Test'
import SearchResult from './pages/SearchResult'
import DetailVideo from './pages/DetailVideo'

import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<LoginSuccess />}>
                    <Route path='/sign-up/*' element={<Signup />} />
                    <Route path='/sign-in/' element={<SignIn />} />
                </Route>

                <Route path='/' element={<Home />} />
                <Route path='/detail/:pictureId' element={<DetailImage />} />
                {/* <Route path='/video/:videoId' element={<DetailVideo />} /> */}
                <Route path='/explore/*' element={<Explores />} />
                <Route path='/policy/*' element={<Policy />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/license' element={<License />} />
                <Route path='/test' element={<Test />} />
                <Route path='/result' element={<SearchResult />} />
                <Route path='*' element={<Navigate to='/' />} />

                <Route element={<PrivateRoute />}>
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/upload/*' element={<Upload />} />
                    <Route path='/setting/*' element={<Setting />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
