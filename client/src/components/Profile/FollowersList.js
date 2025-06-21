import React from 'react'

const FollowersList = ({ follower }) => {
    return (
        <>
            <div>
                <h1>{follower.userName}</h1>
                <p>{follower.firstName}</p>
                <p>{follower.lastName}</p>
                <p>{follower.email}</p>
                <p>{follower.phone}</p>
                <p>{follower.photo}</p>
            </div>
        </>
    )
}

export default FollowersList