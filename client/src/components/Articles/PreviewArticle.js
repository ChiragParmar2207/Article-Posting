import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteArticle, getArticles, getArticlesById } from '../../store/article-slice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PreviewArticle = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { articleId } = useParams()
    const [article, setArticle] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = dispatch(getArticlesById(articleId))
            const data = await response
            setArticle(data.payload.article)
        }
        fetchData()
    }, [articleId, dispatch])

    const editArticleHandler = () => {
        navigate(`/updatearticle/${articleId}`)
    }

    const deleteArticleHandler = async () => {
        const response = dispatch(deleteArticle(articleId))
        const data = await response
        if (data.meta.requestStatus === 'fulfilled') {
            dispatch(getArticles())
        }
        else {
            toast.error(data.payload.message)
        }
        navigate('/articles')
    }

    return (
        <>
            <table border={4}>
                <thead align='center'>
                    <tr>
                        <td colSpan={2}>Article</td>
                    </tr>
                </thead>
                <tbody align='center'>
                    <tr>
                        <td>Topic Name</td>
                        <td>{article && article.topicId.topicName}</td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td>{article && article.content}</td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td>{article && article.userId.userName}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button onClick={editArticleHandler}>Edit</button></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button onClick={deleteArticleHandler}>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default PreviewArticle