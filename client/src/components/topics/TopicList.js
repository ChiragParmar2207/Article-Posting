import React from 'react'
import classes from './TopicList.module.css'

const TopicList = ({ topicName }) => {
    return (
        <>
            <li className={classes.topic}>
                <div>
                    <h3>{topicName}</h3>
                </div>
            </li>
        </>
    )
}

export default TopicList