import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addTopic, getTopics } from '../../store/topic-slice'

const AddTopic = () => {
    const dispatch = useDispatch()
    const [topicName, setTopicName] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault()

        if (topicName.trim().length === 0) {
            toast.warn('Enter Topic to create new Topic')
            return
        }

        const article = { topicName }

        const response = dispatch(addTopic(article))
        const data = await response
        if (data.meta.requestStatus === 'fulfilled') {
            dispatch(getTopics())
            setTopicName('')
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <table border='2' align='center' cellPadding={4} cellSpacing={4}>
                    <thead>
                        <tr align='center'>
                            <td colSpan='2'>Topic Form</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Topic Name</td>
                            <td><input type='text' value={topicName} onChange={e => setTopicName(e.target.value)} /></td>
                        </tr>
                        <tr align='center'>
                            <td colSpan='2'><button>Add Topic</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default AddTopic