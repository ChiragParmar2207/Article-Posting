import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getArticles, getArticlesById, updateArticle } from '../../store/article-slice'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateArticle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { articleId } = useParams()
    const [content, setContent] = useState('')
    const [topicName, setTopicName] = useState('')
    const [article, setArticle] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = dispatch(getArticlesById(articleId))
            const data = await response
            setArticle(data.payload.article)
            setContent(data.payload.article.content)
            setTopicName(data.payload.article.topicId.topicName)
        }
        fetchData()
    }, [articleId, dispatch])

    const submitHandler = async (event) => {
        event.preventDefault()

        if (content.trim().length === 0) {
            toast.warn('Enter content to update article')
            return
        }

        const response = dispatch(updateArticle({ content, id: article._id }))
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
            <form onSubmit={submitHandler}>
                <table border='2' align='center' cellPadding={4} cellSpacing={4}>
                    <thead>
                        <tr align='center'>
                            <td colSpan='2'>Update Article Form</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Topic Name</td>
                            <td>
                                <input type='text' value={topicName} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td><input type='text' value={content} onChange={e => setContent(e.target.value)} /></td>
                        </tr>
                        <tr align='center'>
                            <td colSpan='2'><button>Add Article</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default UpdateArticle