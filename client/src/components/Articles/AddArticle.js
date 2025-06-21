import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addArticle, getArticles } from '../../store/article-slice'

const AddArticle = () => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [topicId, setTopicId] = useState('')
    const topics = useSelector(state => state.topic.topics)

    const submitHandler = async (event) => {
        event.preventDefault()

        if (topicId.trim().length === 0) {
            toast.warn('Select Any topic to create article')
            return
        }

        if (content.trim().length === 0) {
            toast.warn('Enter content to create article')
            return
        }

        const article = { topicId, content }

        const response = dispatch(addArticle(article))
        const data = await response
        if (data.meta.requestStatus === 'fulfilled') {
            dispatch(getArticles())
            setContent('')
            setTopicId('')
        }
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

export default AddArticle