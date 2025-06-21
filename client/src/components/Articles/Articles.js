import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleList from './ArticleList'
import { Link, useNavigate } from 'react-router-dom'
import { getArticles } from '../../store/article-slice'

const Articles = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const articles = useSelector(state => state.article.articles)
    const { isLoggedin } = useSelector(state => state.user)

    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            navigate('/')
        }

        dispatch(getArticles())
    }, [dispatch, isLoggedin, navigate])

    return (
        <>
            <Link to='/addarticle'>Add Article</Link>
            {
                articles.map(article => {
                    const data = {
                        id: article._id,
                        topicName: article.topicId.topicName,
                        content: article.content,
                        user: article.userId.userName
                    }
                    return <ArticleList key={article._id} article={data} />
                })
            }
        </>
    )
}

export default Articles