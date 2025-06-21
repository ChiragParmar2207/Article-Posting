import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TopicList from './TopicList'
import AddTopic from './AddTopic'
import { getTopics } from '../../store/topic-slice'

const Topics = () => {
    const dispatch = useDispatch()

    const topics = useSelector(state => state.topic.topics)
    const { isLoggedin } = useSelector(state => state.user)

    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("userData")) {
            navigate('/')
        }
        dispatch(getTopics())
    }, [dispatch, isLoggedin, navigate]);

    return (
        <>
            <AddTopic />
            {
                topics.map(topic => {
                    return <TopicList key={topic._id} topicName={topic.topicName} />
                })
            }
        </>
    )
}

export default Topics