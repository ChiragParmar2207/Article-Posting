import React from 'react'
import classes from './ArticleList.module.css'
import { useNavigate } from 'react-router-dom'

const ArticleList = ({ article }) => {
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate(`/getarticlesbyId/${article.id}`)
    }

    return (
        <div onClick={onClickHandler}>
            <li className={classes.article}>
                <div>
                    <h3>{article.topicName}</h3>
                    <div className={classes.description}>{article.content}</div>
                    <div className={classes.user}>{article.user}</div>
                </div>
            </li>
        </div>
    )
}

export default ArticleList