import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ArticleList from './ArticleList'
import { getArticles, getArticlesByTopic } from '../../store/article-slice'

const GetArticlesByTopic = () => {
    const dispatch = useDispatch()
    const topics = useSelector(state => state.topic.topics)
    const [articles, setArticles] = useState([])
    const [topicId, setTopicId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(getArticles())
            const data = await response
            setArticles(data.payload.articles)
        }
        fetchData()
    }, [dispatch, topicId])

    const submitHandler = async (event) => {
        event.preventDefault()

        if (topicId.trim().length === 0) {
            toast.warn('Select Any topic to get articles')
            return
        }

        const response = dispatch(getArticlesByTopic(topicId))
        const data = await response
        setArticles(data.payload.articles)

    }


    return (
        <>
            <form onSubmit={submitHandler}>
                <table border='2' align='center' cellPadding={4} cellSpacing={4}>
                    <thead>
                        <tr align='center'>
                            <td colSpan='2'>Article Form</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Topic Name</td>
                            <td>
                                <select value={topicId} onChange={e => setTopicId(e.target.value)}>
                                    <option value=''>---Select---</option>
                                    {
                                        topics.map(topic => {
                                            return <option value={topic._id} key={topic._id}>{topic.topicName}</option>
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr align='center'>
                            <td colSpan='2'><button>Add Article</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {
                articles.map(article => {
                    const data = {
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

export default GetArticlesByTopic