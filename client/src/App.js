import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import SignIn from './components/SignIn'
import HomePage from './components/HomePage'
import SignUp from './components/SignUp'
import SignOut from './components/SignOut'
import { useDispatch, useSelector } from 'react-redux'
import Articles from './components/Articles/Articles'
import { getArticles } from './store/article-slice'
import { getTopics } from './store/topic-slice'
import Topics from './components/topics/Topics'
import GetArticlesByTopic from './components/Articles/GetArticlesByTopic'
import PreviewArticle from './components/Articles/PreviewArticle'
import AddArticle from './components/Articles/AddArticle'
import UpdateArticle from './components/Articles/UpdateArticle'
import Header from './components/Header'
import Profile from './components/Profile/Profile'
import Followers from './components/Profile/Followers'
import Following from './components/Profile/Following'
import { getFollowers } from './store/follow_unfollow-slice'


const App = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedin } = useSelector(state => state.user)

    useEffect(() => {
        console.log('app')

        if (isLoggedin) {
            dispatch(getArticles())
            dispatch(getTopics())
            dispatch(getFollowers())
        }
        // if (!isLoggedin) {
        //     navigate('/')
        // }
    }, [dispatch, isLoggedin, navigate])

    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />

            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signout' element={<SignOut />} />
                <Route path='/articles' element={<Articles />} />
                <Route path='/addarticle' element={<AddArticle />} />
                <Route path='/updatearticle/:articleId' element={<UpdateArticle />} />
                <Route path='/topics' element={<Topics />} />
                <Route path='/getarticlesbytopic' element={<GetArticlesByTopic />} />
                <Route path='/getarticlesbyId/:articleId' element={<PreviewArticle />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/followers' element={<Followers />} />
                <Route path='/following' element={<Following />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
        </>
    )
}

export default App